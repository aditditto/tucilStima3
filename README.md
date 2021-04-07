# Tugas Kecil 3 Strategi Algoritma
#### Implementasi Algoritma A* untuk Menentukan Lintasan Terpendek
Dibuat oleh:
* Aditya Bimawan - 13519064
* Leo Cardhio Sih Pratama - 13519220

##### Algoritma A*
Algoritma A* adalah algoritma informed search yang dapat dimanfaatkan untuk mendapatkan shortest path pada suatu weighted graph. Pada tiap iterasi, dicari node terbaik untuk dikunjungi. Penentuan node ini berdasarkan  evaluasi heuristik yaitu f(n) = g(n) + h(n), dimana g(n) adalah cost untuk sampai ke node saat ini, dan h(n) adalah estimasi cost yang dibutuhkan untuk mencapai goal node dari node saat ini. Apabila fungsi heuristik yang digunakan admissible, maka hasil dari algoritma A* dijamin optimal.

Pada tugas ini dimanfaatkan algoritma A* dalam pencarian rute dalam suatu kota. Dengan input data graf yang menggambarkan jalan dari suatu kota, dapat ditentukan rute terbaik untuk mencapai tujuan dari suatu titik asal. Pada implementasi ini digunakan jarak garis lurus sebagai fungsi heuristik.

## Setup

1. Buka folder src atau bin dengan program Visual Studio Code.
2. Pastikan sudah terinstall extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pada Visual Studio Code.
3. Buka file index.html lalu tekan tombol Go Live pada pojok kanan bawah layar.
4. Seharusnya aplikasi web sudah terbuka di web browser anda. 
5. Masukkan file input json melalui uploader yang ada di bagian kiri atas map.
6. Pilih starting node dan goal node melalui menu dibawah map.
7. Setelah sudah dipilih, jalur terpendek dan panjang jalurnya sesuai algoritma A* akan ditampilkan di layar.
8. Anda bisa mengubah starting dan goal node maupun file input untuk mencoba kasus lain.