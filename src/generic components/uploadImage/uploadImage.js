import { useRef, useState } from 'react';
import classes from './uploadImage.module.css';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import pic from '../../assets/imgs/picture_illustration.png';

function UploadImage(props) {
    const { aspectRatio, setImage } = props;
    const [crop, setCrop] = useState();
    const [upImg, setUpImg] = useState();
    const sourceImage = useRef(null);

    function onDrop(acceptedFiles) {
        console.log(acceptedFiles);
        console.log(URL.createObjectURL(acceptedFiles[0]))
        setUpImg(URL.createObjectURL(acceptedFiles[0]));
    }
    async function getCroppedImage(crop) {
        // creating the cropped image from the source image

        const canvas = document.createElement("canvas");
        const scaleX = sourceImage.current.naturalWidth / sourceImage.current.width;
        const scaleY = sourceImage.current.naturalHeight / sourceImage.current.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            sourceImage.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        canvas.toBlob((blob) => { setImage(blob); });
    };

    return (
        <div className={classes.uploadImageWrapper}>
            {
                !upImg ?
                    <div className={classes.uploadContainer}>
                        <Dropzone
                            onDrop={onDrop}
                            accept="image/png">
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <div {...getRootProps()} className={classes.dropHereDiv}>
                                    <input {...getInputProps()} />
                                    <img src={pic} alt="upload" />
                                    {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
                                </div>
                            )}
                        </Dropzone>
                    </div> :
                    <div className={classes.cropContainer}>
                        <ReactCrop
                            aspect={aspectRatio}
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(crop, pixelCrop) => { getCroppedImage(crop); }}
                        >
                            <img src={upImg} ref={sourceImage} alt="Crop preview" />
                        </ReactCrop>
                        <button className={classes.cancelBtn} onClick={() => { setUpImg(null) }}>Pick another image</button>
                    </div>
            }

        </div>
    )
}

export default UploadImage;