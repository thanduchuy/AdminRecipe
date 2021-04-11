function loadPage() {
  eventAdd();
}

function addOrder() {
  firebase
    .database()
    .ref('Order')
    .push()
    .set(
      new Order(
        'Huy',
        '0387771904',
        'K23/Nguyen Phuoc Chu',
        'PanCake',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDbmFtV1RzagO2SLoc0lUeOfmoNz5ltj00vQ&usqp=CAU',
        213,
        2,
        426,
        'Unapproved'
      )
    );
}

function eventAdd() {
  firebase
    .database()
    .ref('Order')
    .on('child_added', (snapshot) => {
      var element = snapshot.val();
      if (element.status == 'Unapproved') {
        element.id = snapshot.key;
        document.getElementById('tableBody').innerHTML += convertData(element);
      } else if (element.status == 'Complete') {
        document.getElementById('amountOrder').innerHTML =
          Number(document.getElementById('amountOrder').innerHTML) + 1;

        document.getElementById('totalSold').innerHTML = `$${
          Number(
            document.getElementById('amountOrder').innerHTML.substring(1)
          ) + Number(element.total)
        }`;
      }
    });
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
        'Progress'
      )
    );
  event.target.parentNode.parentNode.remove();
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
                 <td class="text-right">
                 <button type="button" class="btn btn-secondary" onclick="changeStatus(event)">${element.status}</button>
                 </td>
            </tr>`;
}
