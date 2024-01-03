import { models as IModels } from "../types/image";

const models: IModels = {

  object_detection: {
    short_name: 'Detection',
    long_name: 'Object Detection',
    icon: 'fa-magnifying-glass',
    description: '',
    models: [
      {
        name: 'YoloV8',
        path: '/model-yolov8/detections',
        img: 'https://assets-global.website-files.com/646dd1f1a3703e451ba81ecc/64994922cf2a6385a4bf4489_UltralyticsYOLO_mark_blue.svg',
      }
    ]
  },

  semantic_segmentation: {
    short_name: 'Segmentation',
    long_name: 'Semantic Segmentation',
    icon: 'fa-split',
    description: '',
    models: [
      {
        name: 'Segment Anything',
        path: '/model-sam',
        img: 'https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png'
      },
    ]
  },
    
  image_inpainting: {
    short_name: 'Inpainting',
    long_name: 'Image Inpainting',
    icon: 'fa-fill-drip',
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