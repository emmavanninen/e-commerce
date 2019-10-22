

$(function() {
    
    let total = parseInt($('#quantity').val())
    let ogPrice = parseInt($('#priceValue').val())
    price = ogPrice
    
    $('#priceValue').val(price.toFixed(2))
    
        $('#minus').click(function () {
            if (total === 0) return;

            total--;
            price -= ogPrice
            $('#priceValue').val(price.toFixed(2))
            $('#total').text(total);
        })
                
        $('#plus').click(function () { 
            total++;
            price += ogPrice
            $('#priceValue').val(price.toFixed(2))
            $('#total').text(total);
        })
    })
