const tasks = {
    object_detection: {
        short_name: 'Detection',
        long_name: 'Object Detection',
        description: '',
        models: [
        {
            name: 'HOG',
            url: '/model-hog-people'
        },
        {
            name: 'YoloV8',
            url: '/model-yolov8'
        }
        ]
    },
    semantic_segmentation: {
        short_name: 'Segmentation',
        long_name: 'Semantic Segmentation',
        description: '',
        models: [
        {
            name: 'Segment Anything',
            url: '/model-sam'
        },
        ]
    },
    image_inpainting: {
        short_name: 'Inpainting',
        long_name: 'Image Inpainting',
        description: '',
        models: [
        {
            name: 'LAMA',
            url: '/model-lama'
        },
        {
            name: 'Pix2pix',
            url: '/model-pix2pix'
        },
        ]
    }
}

export default tasks;