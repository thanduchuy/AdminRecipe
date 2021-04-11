class Order {
  constructor(
    nameUser,
    phone,
    address,
    titleFood,
    imageFood,
    priceFood,
    amount,
    total,
    status
  ) {
    this.nameUser = nameUser;
    this.phone = phone;
    this.address = address;
    this.titleFood = titleFood;
    this.imageFood = imageFood;
    this.priceFood = priceFood;
    this.amount = amount;
    this.total = total;
    this.status = status;
  }
}

var firebaseConfig = {
  apiKey: 'AIzaSyAzDVirGMI3AW6FBYjiYWX8YGep61A1yGw',
  authDomain: 'recipe-a1f70.firebaseapp.com',
  databaseURL: 'https://recipe-a1f70-default-rtdb.firebaseio.com',
  projectId: 'recipe-a1f70',
  storageBucket: 'recipe-a1f70.appspot.com',
  messagingSenderId: '500181680862',
  appId: '1:500181680862:web:5840a56ae60da317a0b84f',
  measurementId: 'G-N5485KHMSY',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
