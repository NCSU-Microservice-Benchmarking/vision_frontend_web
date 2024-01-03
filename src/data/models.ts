
const models: models = {

  object_detection: {
    short_name: 'Detection',
    long_name: 'Object Detection',
    description: '',
    models: [
      {
        name: 'YoloV8',
        path: '/model-yolov8/detections',
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
        path: '/model-sam'
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
        path: '/model-lama'
      },
      {
        name: 'Pix2pix',
        path: '/model-pix2pix'
      },
    ]
  }
}

export default models;