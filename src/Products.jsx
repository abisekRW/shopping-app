import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Image URLs from Firebase Storage (replace with your actual URLs)
const imageLinks = {
  apple: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/apple.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9hcHBsZS5wbmciLCJpYXQiOjE3NTE5NzEzMTYsImV4cCI6MTc4MzUwNzMxNn0.O8dHl288nvM6-uXDQ9ldelxPhX0I0c69qDDYR6dwxGU',

  banana: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/banana.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9iYW5hbmEuanBnIiwiaWF0IjoxNzUxOTcxMzI3LCJleHAiOjE3ODM1MDczMjd9.vI6zjXZ4_E79SgKugmOvyi0C0Da-uxYIWjXjd0Xwyf4',

  orange: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/orange.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9vcmFuZ2UuanBnIiwiaWF0IjoxNzUxOTcxNDA3LCJleHAiOjE3ODM1MDc0MDd9.Gy-PCEEDOQjV6-qZmDBZoY6vzZo1v3LMYPJKmg5gCXE',

  mango: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/mango.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9tYW5nby5qcGciLCJpYXQiOjE3NTE5NzEzODMsImV4cCI6MTc4MzUwNzM4M30.ehBYXSd0pq0U164QZcDFaXMxCFfBHPzlw-bClaibNl8',

  grapes: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/carrot.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9jYXJyb3QuanBnIiwiaWF0IjoxNzUxOTcxMzQ3LCJleHAiOjE3ODM1MDczNDd9.Su59qVGdn5PGuTYDPxkfDlmu1Em7L5QeK6CgWDcvzT8',

  watermelon: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/watermelon.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy93YXRlcm1lbG9uLmpwZWciLCJpYXQiOjE3NTE5NzE0NzgsImV4cCI6MTc4MzUwNzQ3OH0.3xWP3qplRiDubNlEelM2g_GwZ1DGf5-DJF_x-cpIkts',

  strawberry: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/strawberry.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9zdHJhd2JlcnJ5LmpwZWciLCJpYXQiOjE3NTE5NzE0NTcsImV4cCI6MTc4MzUwNzQ1N30.a6TB_eZpx7dVEvvxWZ7ydzWpMOcHCSPC-ulbTPhRTTA',

  pineapple: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/pineapple.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9waW5lYXBwbGUuanBnIiwiaWF0IjoxNzUxOTcxNDIwLCJleHAiOjE3ODM1MDc0MjB9.kr2I8ODg7kUFvLfGl2KNvjlqD8RrRX2hoh5bUjpcMzw',

  kiwi: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/kiwi.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9raXdpLmpwZyIsImlhdCI6MTc1MTk3MTM3NCwiZXhwIjoxNzgzNTA3Mzc0fQ.VwiD7Fwbr94Okf7Rl_doHqMIM9pNnW9_H6dY0sQgTK0',

  tomato: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/tomato.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy90b21hdG8uanBnIiwiaWF0IjoxNzUxOTcxNDY1LCJleHAiOjE3ODM1MDc0NjV9.Dc-HChceoidwxwHHhSQ2UdLW4Mo7cHjlbZLY3tMUJO8',

  potato: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/potato.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9wb3RhdG8uanBnIiwiaWF0IjoxNzUxOTcxNDM0LCJleHAiOjE3ODM1MDc0MzR9.tSeeolHaSiPm3NlkDdqICiEu9dZsd5E-ONYFjpUV62Q',

  carrot: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/carrot.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9jYXJyb3QuanBnIiwiaWF0IjoxNzUxOTcxMzQ3LCJleHAiOjE3ODM1MDczNDd9.Su59qVGdn5PGuTYDPxkfDlmu1Em7L5QeK6CgWDcvzT8',

  brocolli: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/brocolli.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9icm9jb2xsaS5qcGciLCJpYXQiOjE3NTE5NzEzMzUsImV4cCI6MTc4MzUwNzMzNX0.uXGZXl83jMjg_AG3lmftEDbYW8OQNbj8Hqgn2OJD2dY',

  spinach: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/spinach.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9zcGluYWNoLmpwZyIsImlhdCI6MTc1MTk3MTQ0NiwiZXhwIjoxNzgzNTA3NDQ2fQ.Few8Tdv_RSM0fdYjQw-OLlX_WrOXiPJjbBnalmpy9xE',
  
  onion: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/fruits-vegetables/onion.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9mcnVpdHMtdmVnZXRhYmxlcy9vbmlvbi5qcGciLCJpYXQiOjE3NTE5NzEzOTIsImV4cCI6MTc4MzUwNzM5Mn0.t8hDe-cwbaedQPDls-Ix-_aPdCJYz2b7x_cCpilh6_w',

  chips: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/snacks/chips.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9zbmFja3MvY2hpcHMuanBnIiwiaWF0IjoxNzUxOTcwOTU0LCJleHAiOjE3ODM1MDY5NTR9.7DSTYDUMCcmlxUrRGj0wPckZ-x4-H-aivda-0DzFMkA',

  cookies: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/snacks/cookies.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9zbmFja3MvY29va2llcy5qcGciLCJpYXQiOjE3NTE5NzExODUsImV4cCI6MTc4MzUwNzE4NX0.BaCY1yeyFtAtMWM7hqVNZdgPrbAHKI6mfuy0pCqnqaY',

  chocolate: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/snacks/chocolates.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9zbmFja3MvY2hvY29sYXRlcy5qcGciLCJpYXQiOjE3NTE5NzExNzQsImV4cCI6MTc4MzUwNzE3NH0.NnQxYPlCXougJxlh1uPbLwNrHSigsI4RsnaMGa_Up1Q',

  nuts: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/snacks/nuts.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9zbmFja3MvbnV0cy5qcGciLCJpYXQiOjE3NTE5NzExOTgsImV4cCI6MTc4MzUwNzE5OH0.xs69zGSPMuicC-2uVo_XSG6lY9IIptF0rz7V1_0VrEQ',

  popcorn: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/snacks/popcorn.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9zbmFja3MvcG9wY29ybi5qcGciLCJpYXQiOjE3NTE5NzEyMDgsImV4cCI6MTc4MzUwNzIwOH0.tZj_BYOPM12QUbpPG19u6p7FOQmO9HvsZHf82wPoU7I',

  tablet: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/tablet.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy90YWJsZXQuanBnIiwiaWF0IjoxNzUxOTcwNzAxLCJleHAiOjE3ODM1MDY3MDF9.w_8Tu2LdauTU88JseimsgDtOYEAh9jfIUPxTUYYfzbY',

  camera: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/camera.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9jYW1lcmEuanBnIiwiaWF0IjoxNzUxOTcwNTE3LCJleHAiOjE3ODM1MDY1MTd9.Es3MwWL8NGAh4-qE20hJ0OVGJvXktze98Bi4FPvYkeo',

  powerbank: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/powerbank.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9wb3dlcmJhbmsuanBlZyIsImlhdCI6MTc1MTk3MDY2MywiZXhwIjoxNzgzNTA2NjYzfQ.ZINgOAdyAfcpK3yFJ3ahvjzzFgws9KXKUT1K1VwwURE',

  vr: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/vrheadset.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy92cmhlYWRzZXQuanBnIiwiaWF0IjoxNzUxOTcwNzE4LCJleHAiOjE3ODM1MDY3MTh9.ChaeI2g3Z2EZaO0ZNyDDXL5c9aqIuId5b_wkdllEwJ0',

  smarttv: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/smarttv.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9zbWFydHR2LmpwZyIsImlhdCI6MTc1MTk3MDY4MSwiZXhwIjoxNzgzNTA2NjgxfQ.sONdRxLVxsPJKUVnHBSpw91X4Dtr4DgytDUhVNoLcbA',

  gameconsole: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/gameconsole.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9nYW1lY29uc29sZS5qcGciLCJpYXQiOjE3NTE5NzA1NzEsImV4cCI6MTc4MzUwNjU3MX0.m2w00gqXSuvSV3m2hgu66VYv4VrdbsTDpnqhXZWp9HI',

  smartwatch: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/smartwatch.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9zbWFydHdhdGNoLmpwZyIsImlhdCI6MTc1MTk3MDY5MSwiZXhwIjoxNzgzNTA2NjkxfQ.u3rR71rBuUuxRQUAsvZT_CtrKt4XObhlkXBwBQ35Wqo',

  bluetoothspeaker: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/bluetoothspeaker.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9ibHVldG9vdGhzcGVha2VyLmpwZyIsImlhdCI6MTc1MTk3MDUzNCwiZXhwIjoxNzgzNTA2NTM0fQ.59gUvrjvQ8GG_SIwF4-82pWNANHgUBRFrFuOeYz3Rlk',

  carmount: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/carmount.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvY2FybW91bnQuanBnIiwiaWF0IjoxNzUxOTcwODYzLCJleHAiOjE3ODM1MDY4NjN9.p_3f4fCFK4uII52hOVCwFJKnE2LL6aEqkT1Dus11qvY',

  selfiestick: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/selfiestick.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvc2VsZmllc3RpY2suanBnIiwiaWF0IjoxNzUxOTcwOTE5LCJleHAiOjE3ODM1MDY5MTl9.xAeQ0UBOuvB0n4P1M8OvDH515Ox7onzJapptm4px8ho',

  usbcable: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/usbcable.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvdXNiY2FibGUuanBnIiwiaWF0IjoxNzUxOTcwOTI5LCJleHAiOjE3ODM1MDY5Mjl9.KT247ao5UkoqxovFPwHQ5qRHs6lbabwvaQcrjul7hpE',

  wirelesscharger: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/wirelesscharger.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvd2lyZWxlc3NjaGFyZ2VyLmpwZyIsImlhdCI6MTc1MTk3MDkzNywiZXhwIjoxNzgzNTA2OTM3fQ.u7M29qIguFQVRJ2bWqmOn0UYxHSj8yz_fpJ0HB4zxMI',

  bttracker: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/bluetoothtracker.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvYmx1ZXRvb3RodHJhY2tlci5qcGciLCJpYXQiOjE3NTE5NzA4NTIsImV4cCI6MTc4MzUwNjg1Mn0.sSciPZlLyroDDiKlsdvOHyMRIBjNeHkHj0RQ645ryzA',

  earphones: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/electronics/headphones.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9lbGVjdHJvbmljcy9oZWFkcGhvbmVzLmpwZyIsImlhdCI6MTc1MTk3MDU4NSwiZXhwIjoxNzgzNTA2NTg1fQ.ovDsSFA3E-qwcIIPhqGI9_5cAHwNfSiYGiUy4NKRrWE',

  screenguard: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/screenguard.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvc2NyZWVuZ3VhcmQuanBnIiwiaWF0IjoxNzUxOTcwOTEyLCJleHAiOjE3ODM1MDY5MTJ9.yETB6gMuFW38m4zyovQWrf8YF2GdjlRW6XwkN5fuIkI',

  charger: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/charger.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvY2hhcmdlci5qcGciLCJpYXQiOjE3NTE5NzA4NzMsImV4cCI6MTc4MzUwNjg3M30.XTiqYVVX7SvhvC5KuicZaO3G7JcMQG_DzWJ35ygFmJQ',

  phonecase: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/mobile-accessories/phonecase.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9tb2JpbGUtYWNjZXNzb3JpZXMvcGhvbmVjYXNlLmpwZyIsImlhdCI6MTc1MTk3MDg5NiwiZXhwIjoxNzgzNTA2ODk2fQ.4n8yUmkjnCWriNOqvFpvZwLmYtOVkUHxv0e3ErPqq8g',

  thinkpad: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/lenovothinkpad.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL2xlbm92b3RoaW5rcGFkLmpwZyIsImlhdCI6MTc1MTk3MDc4NSwiZXhwIjoxNzgzNTA2Nzg1fQ.-s8F77eYnFw2YEpRPVYrxGmvGRMquGHcrF9NLIu0yxc',

  acer: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/aceraspire.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL2FjZXJhc3BpcmUuanBnIiwiaWF0IjoxNzUxOTcwNzM4LCJleHAiOjE3ODM1MDY3Mzh9.HmrXCS9s1zQoczizhxqgSU3lj0x2Bnw_HhgRrfbieXg',

  asus: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/asuszenbook.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL2FzdXN6ZW5ib29rLmpwZyIsImlhdCI6MTc1MTk3MDc1MiwiZXhwIjoxNzgzNTA2NzUyfQ.rxpK6PBi9AKPp_6ib5Yaij68LTaOvauzCsRB4jwJUj0',

  surface: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/microsoftsurface.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL21pY3Jvc29mdHN1cmZhY2UuanBnIiwiaWF0IjoxNzUxOTcwODEzLCJleHAiOjE3ODM1MDY4MTN9.BG0OTEjRGS4shuLY9uzYOr1AxUmYkH9AHSw-7_sfjy8',

  msi: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/msimodern.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL21zaW1vZGVybi5qcGciLCJpYXQiOjE3NTE5NzA4MjQsImV4cCI6MTc4MzUwNjgyNH0.EppofX7XfthQPsoKOqYwS7W7azRyZPDPMVpaV8KjErs',

  samsungbook: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/samsunggalaxybook.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL3NhbXN1bmdnYWxheHlib29rLmpwZyIsImlhdCI6MTc1MTk3MDgzNCwiZXhwIjoxNzgzNTA2ODM0fQ.vcHpPitzpebYfaa0dzC9ioIjvz8Ha8pThEulSBOflrM',

  dell: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/dellinspiron.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL2RlbGxpbnNwaXJvbi5qcGciLCJpYXQiOjE3NTE5NzA3NjMsImV4cCI6MTc4MzUwNjc2M30.gAITTheti_oFdyr7hIsjf51ZlVFkPij-XpmZf3kZbCI',

  hp: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/hppavilion.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL2hwcGF2aWxpb24uanBnIiwiaWF0IjoxNzUxOTcwNzc1LCJleHAiOjE3ODM1MDY3NzV9.iNbBuOHt3-MxoVeSKUTL704T_iCsd7IP6MEyjorc2No',

  mac: 'https://bcfbevnlfzxuthjicnwr.storage.supabase.co/v1/object/sign/shopping/laptops/macbookpro.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YWUzZTRmZS05OWJiLTRkZmQtODVlNC0yNjdjODRjOWIxMDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9wcGluZy9sYXB0b3BzL21hY2Jvb2twcm8uanBnIiwiaWF0IjoxNzUxOTcwODAxLCJleHAiOjE3ODM1MDY4MDF9.A8GwPLrhC3vA3kIar6P-13l19f_8ImLN-DxSCIqn8aE',
};

function Products({ cart, setCart }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [page, setPage] = useState(0); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);
  const fruitsAndVegetables = [
    { id: 1, name: "Apple", price: 10, image: imageLinks.apple },
    { id: 2, name: "Banana", price: 5, image: imageLinks.banana },
    { id: 3, name: "Orange", price: 8, image: imageLinks.orange },
    { id: 4, name: "Mango", price: 15, image: imageLinks.mango },
    { id: 5, name: "Grapes", price: 12, image: imageLinks.grapes },
    { id: 6, name: "Watermelon", price: 20, image: imageLinks.watermelon },
    { id: 7, name: "Strawberry", price: 18, image: imageLinks.strawberry },
    { id: 8, name: "Pineapple", price: 25, image: imageLinks.pineapple },
    { id: 9, name: "Kiwi", price: 30, image: imageLinks.kiwi },
    { id: 10, name: "Tomato", price: 6, image: imageLinks.tomato },
    { id: 11, name: "Potato", price: 4, image: imageLinks.potato },
    { id: 12, name: "Carrot", price: 7, image: imageLinks.carrot },
    { id: 13, name: "Broccoli", price: 14, image: imageLinks.brocolli },
    { id: 14, name: "Spinach", price: 9, image: imageLinks.spinach },
    { id: 15, name: "Onion", price: 5, image: imageLinks.onion },
  ];
  const snacks = [
    { id: 16, name: "Chips", price: 20, image: imageLinks.chips },
    { id: 17, name: "Cookies", price: 30, image: imageLinks.cookies },
    { id: 18, name: "Chocolate", price: 25, image: imageLinks.chocolate },
    { id: 19, name: "Nuts", price: 40, image: imageLinks.nuts },
    { id: 20, name: "Popcorn", price: 15, image: imageLinks.popcorn },
  ];
  const electronics = [
    { id: 21, name: "Headphones", price: 1200, image: imageLinks.earphones },
    { id: 22, name: "Smart Watch", price: 2500, image: imageLinks.smartwatch },
    { id: 23, name: "Bluetooth Speaker", price: 1800, image: imageLinks.bluetoothspeaker },
    { id: 30, name: "Tablet", price: 15000, image: imageLinks.tablet },
    { id: 31, name: "Camera", price: 22000, image: imageLinks.camera },
    { id: 32, name: "Power Bank", price: 1200, image: imageLinks.powerbank },
    { id: 33, name: "VR Headset", price: 8000, image: imageLinks.vr },
    { id: 34, name: "Smart TV", price: 35000, image: imageLinks.smarttv },
    { id: 35, name: "Game Console", price: 40000, image: imageLinks.gameconsole },
  ];
  const mobileAccessories = [
    { id: 24, name: "Phone Case", price: 300, image: imageLinks.phonecase },
    { id: 25, name: "Screen Guard", price: 150, image: imageLinks.screenguard },
    { id: 26, name: "Charger", price: 500, image: imageLinks.charger },
    { id: 36, name: "Earphones", price: 350, image: imageLinks.earphones },
    { id: 37, name: "Car Mount", price: 450, image: imageLinks.carmount },
    { id: 38, name: "Selfie Stick", price: 250, image: imageLinks.selfiestick },
    { id: 39, name: "USB Cable", price: 120, image: imageLinks.usbcable },
    { id: 40, name: "Wireless Charger", price: 900, image: imageLinks.wirelesscharger },
    { id: 41, name: "Bluetooth Tracker", price: 600, image: imageLinks.bttracker },
  ];
  const laptops = [
    { id: 27, name: "MacBook Pro", price: 120000, image: imageLinks.mac },
    { id: 28, name: "Dell Inspiron", price: 70000, image: imageLinks.dell },
    { id: 29, name: "HP Pavilion", price: 65000, image: imageLinks.hp },
    { id: 42, name: "Lenovo ThinkPad", price: 60000, image: imageLinks.thinkpad },
    { id: 43, name: "Acer Aspire", price: 55000, image: imageLinks.acer },
    { id: 44, name: "Asus ZenBook", price: 75000, image: imageLinks.asus },
    { id: 45, name: "Microsoft Surface", price: 95000, image: imageLinks.surface },
    { id: 46, name: "MSI Modern", price: 80000, image: imageLinks.msi },
    { id: 47, name: "Samsung Galaxy Book", price: 85000, image: imageLinks.samsungbook },
  ];
  
  const plus = (id) => {
    setQuantity((old) => ({ ...old, [id]: (old[id] || 1) + 1 }));
  };

  const minus = (id) => {
    setQuantity((old) => ({
      ...old,
      [id]: old[id] > 1 ? old[id] - 1 : 1,
    }));
  };

  const add = async (product) => {
    if (!user) {
      alert("Please log in to purchase items.");
      navigate("/Login");
      return;
    }

    const qty = quantity[product.id] || 1;
    const exists = cart.find((item) => item.id === product.id);
    let newCart;

    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: qty }];
    }

    setCart(newCart);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

    // Save purchase to Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    let purchases = [];
    if (userDocSnap.exists()) {
      purchases = userDocSnap.data().purchases || [];
    }
    const idx = purchases.findIndex((item) => item.id === product.id);
    if (idx !== -1) {
      purchases[idx].quantity += qty;
    } else {
      purchases.push({ ...product, quantity: qty });
    }
    await setDoc(userDocRef, { purchases }, { merge: true });
  };

  const goToCart = () => navigate("/Cart");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-700">Shop by Category</h2>
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 0 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(0)}
        >
          Fruits & Vegetables
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 1 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(1)}
        >
          Snacks
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 2 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(2)}
        >
          Electronics
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 3 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(3)}
        >
          Mobile Accessories
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 4 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(4)}
        >
          Laptops
        </button>
      </div>
      {page === 0 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Fruits &amp; Vegetables</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {fruitsAndVegetables.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  ) : (
                    <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-2xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Snacks</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {snacks.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  ) : (
                    <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-2xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Electronics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {electronics.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {page === 3 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Mobile Accessories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {mobileAccessories.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {page === 4 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Laptops</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {laptops.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="flex justify-center mt-8">
        <button className="bg-green-600 text-white py-2 px-8 rounded-full text-lg font-bold shadow-lg hover:bg-green-700 transition-colors duration-200" onClick={goToCart}>Go to Cart</button>
      </div>
    </div>
  );
}

export default Products;
