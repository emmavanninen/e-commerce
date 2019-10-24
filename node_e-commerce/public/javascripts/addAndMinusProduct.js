// $(function() {
    
//     let total = parseInt($('#quantity').val())
//     let ogPrice = parseInt($('#priceValue').val())
//     price = ogPrice

//     $('#priceValue').val(price.toFixed(2))
    
//         $('#minus').click(function () {
//             if (total === 1) return;

//             total--;
//             price -= ogPrice
//             $('#priceValue').val(price.toFixed(2))
//             $('#total').val(total).text(total);
//         })
                
//         $('#plus').click(function () { 
//             total++;
//             price += ogPrice
//             $('#priceValue').val(price.toFixed(2))
//             $('#total').val(total).text(total);
//             console.log($('#total').val());
            
//         })
//     })


$(document).on('click', '#plus', (event) => {
    let priceValue = parseFloat($('#priceValue').val())
    let quantity = parseInt($('#quantity').val())

    priceValue += parseFloat($('#priceHidden').val())
    quantity++

    $('#quantity').val(quantity)
    $('#priceValue').val(priceValue.toFixed(2))
    $('#total').html(quantity)
})

$(document).on('click', '#minus', (event) => {
    let priceValue = parseFloat($('#priceValue').val())
    let quantity = parseInt($('#quantity').val())

    if (quantity === 1) {
        priceValue = parseFloat($('#priceHidden').val())
    } else {
        priceValue -= parseFloat($('#priceHidden').val())
        quantity--
    }

    $('#quantity').val(quantity)
    $('#priceValue').val(priceValue.toFixed(2))
    $('#total').html(quantity)
})