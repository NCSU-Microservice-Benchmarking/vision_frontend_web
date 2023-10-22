const image = {
  createBlob: (data: any, type: 'file' | 'binary', returnUrl?: boolean): any => {
    let blob;
    let url;

    if (type === 'binary') {
        blob = new Blob([data], { type: 'image/png' });
    } else {
        blob = data;
    }

    url = URL.createObjectURL(blob);

    if (returnUrl) {
        console.log(url);
        return url;
    }
  },

  createBase64: (data: string) => {
    const base64String = btoa(data); // Encoding binary data to base64
    const url = `data:image/png;base64,${base64String}`;

    return url;
  }
}

export default image;