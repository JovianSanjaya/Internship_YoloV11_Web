from flask import Flask, request, render_template, send_file, jsonify
import numpy as np
from PIL import Image
from sahi.predict import get_sliced_prediction
from sahi import AutoDetectionModel
import os
import zipfile
import io
import json
from flask import Flask, request, jsonify, render_template
import numpy as np
from tensorflow import keras
import pickle
import json
import tempfile
import subprocess
import glob

app = Flask(__name__)


class Detection:
    def __init__(self):

        # Set the model path andonfidence threshold
        yolov8_model_path = "./object_detection/train_model.pt"  # Update to your model path

        # Initialize the AutoDetectionModel
        self.model = AutoDetectionModel.from_pretrained(
            model_type='yolov8',  
            model_path=yolov8_model_path,
            confidence_threshold=0.3,
            device="cuda:0"  
        )

        self.class_labels = {0: 'Nicks', 1: 'Dents', 2: 'Scratches', 3: 'Pittings'}
       
    def detect_from_image(self, image):
     

        # Perform sliced prediction with SAHI
        results = get_sliced_prediction(
            image=image,
            detection_model=self.model,  # Use the initialized AutoDetectionModel
            slice_height=256,
            slice_width= 256,
            overlap_height_ratio=0.5,
            overlap_width_ratio=0.5,
            postprocess_type='NMS',
            postprocess_match_metric='IOU',
            postprocess_match_threshold=0.3,
            postprocess_class_agnostic=True
        )

        # Return results for visualization
        return results

detection = Detection()

@app.route('/')
def index():
    return render_template('loginpage.html')


@app.route('/index.html')
def mainpage():
    return render_template('index.html')



@app.route('/chatbot.html')
def chabot():
    return render_template('chatbot.html')


@app.route('/object-detection/', methods=['POST'])
def apply_detections():
    try:
        # Load the image from the request
        file = request.files['file']
        img = Image.open(file.stream).convert("RGB")
        img = np.array(img)

        # Perform detection
        results = detection.detect_from_image(img)

        # Create a temporary directory to export the visualized image
        with tempfile.TemporaryDirectory() as temp_dir:
            # Define paths for the output image and annotation JSON
            output_filename = os.path.join(temp_dir, "prediction_visual.png")
            annotation_filename = os.path.join(temp_dir, "annotations.json")


            # Save visualized detection results to an image file
            results.export_visuals(
                export_dir=temp_dir,  # Use the temporary directory for export
                text_size=0.4,
                rect_th=2
            )

            # Load the visualized image into a BytesIO buffer
            img_buffer = io.BytesIO()
            with open(output_filename, "rb") as img_file:
                img_buffer.write(img_file.read())
            img_buffer.seek(0)

            # Save COCO annotations to a JSON file in the temporary directory
            coco_annotations = results.to_coco_annotations()
            with open(annotation_filename, "w") as f:
                json.dump(coco_annotations, f)

            # Create a BytesIO buffer for the JSON annotations
            annotation_buffer = io.BytesIO()
            with open(annotation_filename, "rb") as json_file:
                annotation_buffer.write(json_file.read())
            annotation_buffer.seek(0)

            # Create a zip file with both the image and annotations
            zip_buffer = io.BytesIO()
            with zipfile.ZipFile(zip_buffer, "w") as zip_file:
                zip_file.writestr("prediction_visual.png", img_buffer.getvalue())
                zip_file.writestr("annotations.json", annotation_buffer.getvalue())

            # Move the zip buffer cursor to the beginning so it can be sent
            zip_buffer.seek(0)


            # Send the zip file to the client
            return send_file(zip_buffer, mimetype='application/zip', as_attachment=True, download_name="detection_results.zip")

    except Exception as e:
        # Return a JSON response with error details if an error occurs
        return jsonify({'error': f"Detection failed: {str(e)}"}), 500
    









# Load the intents from the JSON file
with open("./chatbot/intent.json") as file:
    data = json.load(file)

# Load the pre-trained neural network model
model_chatbot = keras.models.load_model('./chatbot/chat_model.keras')

# Load the tokenizer object used for word tokenization
with open('./chatbot/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Load the label encoder object used for encoding and decoding labels
with open('./chatbot/label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

# Set the maximum length for input sequences
max_len = 20



@app.route('/chat', methods=['POST'])
def chat():
    # Get the user message from the POST request
    user_message = request.json.get('message')

    # Preprocess user input for prediction
    result = model_chatbot.predict(keras.preprocessing.sequence.pad_sequences(
        tokenizer.texts_to_sequences([user_message]),
        truncating='post', maxlen=max_len))

    # Decode the predicted label using the label encoder
    predicted_index = np.argmax(result)
    confidence = result[0][predicted_index]

    # Define a threshold for confidence (e.g., 0.7)
    confidence_threshold = 0.9

    print(confidence)

    # If the confidence is below the threshold, return a fallback message
    if confidence < confidence_threshold:
        return jsonify({'reply': "I'm sorry, I didn't understand that."})
    
    print(f"Predicted index: {predicted_index}, Confidence: {confidence}")


    # If confidence is above the threshold, proceed with intent matching
    tag = lbl_encoder.inverse_transform([predicted_index])

    print(f"Predicted tag: {tag}")


    # Find the intent in the data corresponding to the predicted label
    for i in data['intents']:
        if i['tag'] == tag:
            # Select a random response from the responses for this intent
            response = np.random.choice(i['responses'])
            return jsonify({'reply': response})

    # In case no intent matches (although this should be unlikely)
    return jsonify({'reply': "no intent found"})

















# # Directories for images
# UPLOAD_FOLDER = "./stitching/img_dir/"
# OUTPUT_FOLDER = "./stitching/"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# @app.route("/upload", methods=["POST"])
# def upload_files():
#     """
#     Receive images from the frontend, save them, and run the stitching command.
#     """
#     if "images" not in request.files:
#         return jsonify({"error": "No files uploaded"}), 400

#     uploaded_files = request.files.getlist("images")
#     if len(uploaded_files) == 0:
#         return jsonify({"error": "No files selected"}), 400

#     # Save each uploaded file
#     file_paths = []
#     for i, image in enumerate(uploaded_files):
#         file_path = os.path.join(UPLOAD_FOLDER, f"Image_{i+1}.jpg")
#         image.save(file_path)
#         file_paths.append(file_path)

#     # Run the stitching command using the saved images
#     command = f"stitch {' '.join(file_paths)}"
#     try:
#         subprocess.run(command, shell=True, check=True)

#         # Check if the stitched result exists in OUTPUT_FOLDER
#         result_image_path = os.path.join(OUTPUT_FOLDER, "result.jpg")

#         # If not found, check if it's saved in `./`
#         if not os.path.exists(result_image_path):
#             result_image_path = os.path.join("./", "result.jpg")  # Check in root folder

#         if os.path.exists(result_image_path):
#             return send_file(result_image_path, mimetype="image/jpg")

#         return jsonify({"error": "Stitched image not found."}), 500

#     except subprocess.CalledProcessError as e:
#         return jsonify({"error": f"Error executing stitch: {str(e)}"}), 500
    



# Directories for images
UPLOAD_FOLDER = "./stitching/img_dir/"
OUTPUT_FOLDER = "./stitching/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_files():
    """
    Receive images from the frontend, save them, and run the stitching command.
    """
    if "images" not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    uploaded_files = request.files.getlist("images")  # Get all files with the key "images"
    if len(uploaded_files) == 0:
        return jsonify({"error": "No files selected"}), 400

    # Save each uploaded file
    file_paths = []
    for i, image in enumerate(uploaded_files):
        if image.filename == "":
            continue  # Skip empty files
        file_path = os.path.join(UPLOAD_FOLDER, f"Image_{i+1}.jpg")
        image.save(file_path)
        file_paths.append(file_path)

    # Run the stitching command using the saved images
    command = f"stitch {' '.join(file_paths)}"
    try:
        subprocess.run(command, shell=True, check=True)

        # Check if the stitched result exists in OUTPUT_FOLDER
        result_image_path = os.path.join(OUTPUT_FOLDER, "result.jpg")

        # If not found, check if it's saved in `./`
        if not os.path.exists(result_image_path):
            result_image_path = os.path.join("./", "result.jpg")  # Check in root folder

        if os.path.exists(result_image_path):
            return send_file(result_image_path, mimetype="image/jpg")

        return jsonify({"error": "Stitched image not found."}), 500

    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Error executing stitch: {str(e)}"}), 500



@app.route('/delete-images', methods=['POST'])
def delete_images():
    img_dir = "./stitching/img_dir/*"
    result_file = "./result.jpg"

    # Delete all images in the directory
    for file in glob.glob(img_dir):
        os.remove(file)

    # Delete result file if it exists
    if os.path.exists(result_file):
        os.remove(result_file)

    return jsonify({"message": "All images deleted successfully."})


if __name__ == "__main__":
    app.run(debug=True)


