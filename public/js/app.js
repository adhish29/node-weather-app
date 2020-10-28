// fetch('http://puzzle.mead.io/puzzle')
// .then(res => {
//   res.json()
//   .then((data) => {
//     console.log(data);
//   })
// })



const form = document.querySelector('form');
const loc = document.querySelector('input');
const m_1 = document.querySelector('#messageOne');
const m_2 = document.querySelector(('#messageTwo'));

form.addEventListener('submit', e => {
  e.preventDefault();

  m_1.textContent = 'Loading...';
  m_2.textContent = '';

  const l = loc.value;
  const url = '/weather?address=' + encodeURIComponent(l);
  // console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.error)
      m_1.textContent = data.error;
    else{
      m_1.textContent = data.location;
      m_2.textContent = data.forecast.temp;
    }
  })
  
})