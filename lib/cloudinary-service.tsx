import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const url = (publicId, options) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    //@ts-ignore
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
};

export const openUploadWidget = (options, callback) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    //@ts-ignore
    window.cloudinary.openUploadWidget(scOptions, callback);
};
