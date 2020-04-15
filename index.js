

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


class ElementHandler {

  element(element) {
    if (element.tagName == 'h1') {
      element.prepend("Desmond's")
    }else if (element.tagName == 'p') {
      element.setInnerContent("Desmond's Internship At Cloudflare");
    }else if (element.tagName = 'a') {
      element.setAttribute('href', 'https://nyamador.me');
      element.setInnerContent("Go To Desmond's Website ");
    }else if (element.tagName = 'title') {
      element.setInnerContent("Desmond at Cloudflare");
    }
  }

}

/**
 * 
 * @param {Request} request
 */
async function handleRequest(request) {

  // ? Add a method to Array prototype for generating a random url from the array of variants
  Array.prototype.balanceLoad = function () {
    return this[Math.floor(Math.random() * this.length)];
  }

  const response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  const data = await response.json();
  const variants = data.variants;
  const variant = variants.balanceLoad()



  const res = await fetch(variant);

  return new HTMLRewriter().on('h1#title', new ElementHandler())
    .on('p#description', new ElementHandler())
    .on('a#url', new ElementHandler())
    .on('title', new ElementHandler())
    .transform(res);
}
