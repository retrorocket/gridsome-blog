export const imageZoom = () => {
  const images = document.querySelectorAll(".entry-wrap a img");
  images.forEach((image) => {
    const origin = image.parentNode.href;
    image.dataset.zoomSrc = origin;
    image.parentNode.parentNode.insertBefore(image, image.parentNode);
  });
}
