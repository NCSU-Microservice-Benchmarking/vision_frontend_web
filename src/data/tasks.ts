const tasks = {
    object_detection: {
        short_name: 'Detection',
        long_name: 'Object Detection',
        description: '',
        models: ['HOG-Feature', 'YoloV8']
    },
    semantic_segmentation: {
        short_name: 'Segmentation',
        long_name: 'Semantic Segmentation',
        description: '',
        models: ['YoloV8', 'Segment Anything', 'UNet']
    },
    image_inpainting: {
        short_name: 'Inpainting',
        long_name: 'Image Inpainting',
        description: '',
        models: ['LAMA', 'AOTGAN', 'Pix2pix']
    }
}

export default tasks;