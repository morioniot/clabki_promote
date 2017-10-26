
// ASKING FOR SIGNATURE
console.log("Entrando en JS");
axios('../server/signatureGenerator.php')
.then(function(response) {
    console.log(response);
    $("#signature").val(response.data.signature);
    $("#referenceCode").val(response.data.reference_code);
})
.catch(function(error) {
    console.log(error);
});
