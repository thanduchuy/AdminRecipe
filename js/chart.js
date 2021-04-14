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
      if (element.status == 'Progress') {
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
                <td class="text-right" hidden>$${element.idDevice}</td>
                 <td class="text-right">
                 <button type="button" class="btn btn-secondary" onclick="changeStatus(event)">${element.status}</button>
                 </td>
            </tr>`;
}

function changeStatus(event) {
  let row = event.target.parentNode.parentNode.children;
  let uid = row[0].innerHTML;
  firebase
    .database()
    .ref('Order/' + uid)
    .set(
      new Order(
        row[1].innerHTML,
        row[2].innerHTML,
        row[3].innerHTML,
        row[4].innerHTML,
        row[5].children[0].src,
        row[6].innerHTML.substring(1),
        row[7].innerHTML,
        row[8].innerHTML.substring(1),
        'Complete',
        row[9].innerHTML
      )
    );
  event.target.parentNode.parentNode.remove();
}
