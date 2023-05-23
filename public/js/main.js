// get dropzone & audioplayer
const dropzone = document.querySelector('.dropzone');
const audioPlayer = document.querySelector('.audioPlayer');

// max file size (1048576 = 1mb)
const fileSizeLimit = 5 * 1048576;

dropzone.addEventListener('dragover', e => {
    // prevent default on dragover event to stay on the same page
    e.preventDefault();
});

dropzone.addEventListener('drop', e => {
    // prevent default on drop event aswell, to stay on the same page
    e.preventDefault();

    // get the first file the user uploaded
    const file = e.dataTransfer.files[0];

    // check if the file size isn't too big
    if (file.size > fileSizeLimit) {
        // give feedback to the user
        dropzone.innerText = `Error: Maximum filesize is ${Math.ceil(fileSizeLimit / 1048576)}mb\nYour current file ${file.name} is ${Math.ceil(file.size / 1048576)}mb which is ${Math.ceil(file.size / 1048576) - Math.ceil(fileSizeLimit / 1048576)}mb too large.`;
    } else {
        // set the text in the dropzone to be the name of the file
        dropzone.innerText = `Selected file: ${file.name}`;

        // create a new file reader
        const reader = new FileReader();

        // use the readAsDataURL(); method to get the audio file as a URL you can use to set the source of your audio player
        reader.readAsDataURL(file);

        // the 'loadend' event on the reader is ran when the reader is finished reading the file
        reader.addEventListener('loadend', () => {
            // set the source of the audioplayer with the result of the reader
            audioPlayer.src = reader.result;
        });
    }
});