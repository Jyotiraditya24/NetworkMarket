const  handleSpinner = (flag) => {
  flag
    ? document.getElementById('spinner').classList.remove('d-none')
    : document.getElementById('spinner').classList.add('d-none');
}

export default handleSpinner ;
