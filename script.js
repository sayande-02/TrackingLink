const form = document.getElementById('billForm');
const phoneInput = document.getElementById('whatsapp');

// Format and restrict input to digits
phoneInput.addEventListener('input', function () {
  let digits = phoneInput.value.replace(/\D/g, '').substring(0, 10);

  // Format: XXXXX XXXXX
  if (digits.length > 5) {
    digits = digits.substring(0, 5) + ' ' + digits.substring(5);
  }

  phoneInput.value = digits;
});

// Block non-digit keypress
phoneInput.addEventListener('keypress', function (e) {
  if (!/\d/.test(e.key)) {
    e.preventDefault();
  }
});

// Submit event
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const rawPhone = phoneInput.value.replace(/\D/g, '');
  const tracking = document.getElementById('tracking').value.trim();

  if (!name || !amount || !rawPhone || !tracking) {
    alert('Please fill in all fields.');
    return;
  }

  if (rawPhone.length !== 10) {
    alert('Please enter a valid 10-digit Indian mobile number.');
    return;
  }

  const phone = '91' + rawPhone;
  const track24Link = `https://track24.net/?code=${tracking}`;
  const indiaPostLink = `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx`;

  const message = `Hello ${name}, your total bill is ₹${amount}.\n\nTrack your parcel here (3rd party link): ${track24Link}\n\nFor official details, visit India Post: ${indiaPostLink}\n\nThank you!`;

  const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
  document.getElementById('billForm').reset();

});
