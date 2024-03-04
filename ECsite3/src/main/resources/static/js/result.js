const result = (innerHtml) => {
  return innerHtml.replace(/[^0-9]/g,"")
};

export { result }
