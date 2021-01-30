import face_recognition
import os
import cv2
import numpy as np

# Get the camera for taking video
video = cv2.VideoCapture(0)

KNOWN_DIR = "known"
TOL = 0.45

# load image of known people to process
duy_image = face_recognition.load_image_file("known/duy.jpg")

# Encoding the known people face
duy_face_encoding = face_recognition.face_encodings(duy_image)[0]



# array contains known face encoding
known_face_encodings = [
    duy_face_encoding
]

known_face_names = [
    "Member"
]

# array contains location all the faces detected from video capture in order to draw box
face_locations = []

# array contains face encoding (both known and unknown) from video capture
face_encodings = []

face_names =[]

process_this_frame = True

while True:
    # take 1 single frame from the video
    ret, frame = video.read()

    # scale down the image to 1/4 original size for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    #convert color format of opencv to color format of face_rec
    rgb_small_frame = small_frame[:, :, ::-1]

    if process_this_frame:
        
        # detect faces and encode them in to containers
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, TOL)
            name = "Unknown Face"

            # # If a match was found in known_face_encodings, just use the first one.
            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            face_names.append(name)

    process_this_frame = not process_this_frame


# Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', frame)

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video.release()
cv2.destroyAllWindows()

