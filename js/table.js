function loadPage() {
  let session = sessionStorage.getItem('user');

  let url = window.location.href;
  let indexSplash = url.lastIndexOf('/');
  let newUrl = '';
  if (session == null) {
    newUrl = url.slice(0, indexSplash) + '/login.html';
    window.location.href = newUrl;
  }

  eventAdd();
}

function eventAdd() {
  firebase
    .database()
    .ref('Order')
    .on('child_added', (snapshot) => {
      var element = snapshot.val();
      if (element.status == 'Complete') {
        element.id = snapshot.key;
        document.getElementById('tableBody').innerHTML += convertData(element);
      }
    });
}

function convertData(element) {
  return `
            <tr>
                <td>${element.id}</td>
                <td>${element.nameUser}</td>
                <td>${element.phone}</td>
                <td>${element.address}</td>
                <td class="text-right">${element.titleFood}</td>
                <td class="text-right">
                    <img src="${element.imageFood}">
                </td>
                <td class="text-right">$${element.priceFood}</td>
                <td>${element.amount}</td>
                <td class="text-right">$${element.total}</td>
            </tr>`;
}
