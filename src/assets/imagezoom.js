export const imageZoom = () => {
  const images = document.querySelectorAll(".entry-wrap a img");
  images.forEach((image) => {
    const origin = image.parentNode.href;
    image.dataset.zoomSrc = origin;
    if (image.hasAttribute("aria-describedby")) {
      image.removeAttribute('loading');
    }
    image.parentNode.parentNode.insertBefore(image, image.parentNode);
  });
}
