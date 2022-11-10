window.addEventListener('load', function () {

   const box = document.querySelector('.container');
   const cols = document.querySelectorAll('.col');
   const textInfo = box.querySelectorAll('h4');

   function setRandomColor(isInitial) {
      const colors = isInitial ? getColorsFromHash() : []

      cols.forEach(function (elem, index) {
         let lock = elem.querySelector('.fa-lock-open');
         let title = elem.querySelector('.title');
         let infoText = elem.querySelector('h4');
         if (lock) {
            let color = isInitial ? colors[index] : generateRandomColor();
            setTextColor(title, color, lock, infoText);
            title.innerHTML = color;
            elem.style.background = color;
            if (!isInitial) {
               colors.push(color);
            }
         } else {
            colors.push(title.textContent);
         }
      })
      updateColorsHash(colors)
   }

   function generateRandomColor() {
      const hexCode = '0123456789ABCDEF';
      let color = ''
      for (let i = 0; i < 6; i++) {
         color += hexCode[Math.floor(Math.random() * hexCode.length)]
      }
      return '#' + color
   }


   function setTextColor(text, color, lock, infoText) {
      let luminance = chroma(color).luminance();
      text.style.color = luminance > 0.5 ? 'black' : 'white';
      lock.style.color = luminance > 0.5 ? 'black' : 'white';
      infoText.style.color = luminance > 0.5 ? 'black' : 'white';
   }

   function updateColorsHash(colors = []) {
      document.location.hash = colors.map(col => { return col.toString().substring(1); }).join('-')
   }

   function getColorsFromHash() {
      if (document.location.hash.length > 1) {
         return document.location.hash.
            substring(1).
            split('-').
            map((color) => '#' + color)
      }
      return []
   }

   box.addEventListener('click', function (e) {
      let target = e.target;
      if (target.classList.contains('col')) {
         setRandomColor()
      }
      if (target.classList.contains('title')) {
         navigator.clipboard.writeText(target.textContent);
         let info = target.parentNode.querySelector('h4');
         info.classList.toggle('visible');
         let toggleClass = setTimeout(function () {
            info.classList.toggle('visible');
         }, 500)

      }

   });

   document.addEventListener('keydown', function (e) {
      let key = e.code;
      console.log(key);
      if (key == 'Space') {
         setRandomColor()
      }
   });

   box.addEventListener('click', function (e) {
      let target = e.target;
      if (target.classList.contains('item-block')) {
         target.classList.toggle('fa-lock');
         target.classList.toggle('fa-lock-open');
      }
   })


   setRandomColor(true)
});