var timeRemaining = 120;
var timerInterval;
let otp = '';

$(function () {
    $('#currentYear').text(new Date().getFullYear());

    $('#sec_OTP').hide();
    $('#sec_Details').hide();
    $('#sec_Success').hide();
    $('#sec_Failed').hide();
    $('#input_Number').focus();

    selectAny($('#select_AnyOne').val());

    $('#select_AnyOne').on('change', function () {
        let value = $(this).val();

        selectAny(value);
        $('#input_Number').focus();
    });

    $('#btn_Submit').on('click', function () {
        if ($('#input_Number').val().length > 0) {
            $('#sec_Initial').hide();
            removeOTPFrmUrl();
            startTimer();
            generateOTP();
            $('#btn_VerifyOTP').attr('disabled', true);
            $('#sec_OTP').show();

            $('.digit:first-child').focus();
        } else {
            $('#input_Number_Error').show();
        }
    });

    $('#input_Number').on('input', function () {
        if ($('#input_Number').val().length > 0) {
            $('#input_Number_Error').hide();
        } else {
            $('#input_Number_Error').show();
        }
    });

    $('#input_AddMoney').on('input', function () {
        $(this).val(
            $(this)
                .val()
                .replace(/[^0-9]/g, '')
        );
        if ($(this).val().length > 0 && $(this).val() != 0) {
            $('#proceed_Btn').attr('disabled', false);
        } else {
            $('#proceed_Btn').attr('disabled', true);
        }
    });

    $('#input_AddMoney').on('focusout', function () {
        var value = $(this).val();
        if (/^\d+$/.test(value)) {
            value += '.00';
        }
        $(this).val(value);
    });

    //TIMER
    $('#link_resendOTP').on('click', function (e) {
        e.preventDefault();
        clearInterval(timerInterval);
        timeRemaining = 120;
        $('.timer').show();
        $(this).attr('disabled', true);
        updateTimer();
        startTimer();
    });

    //OTP
    $('.digit').on('input', function () {
        var $this = $(this);
        var index = $('.digit').index($this);
        if ($this.val().length === 1) {
            if (index < $('.digit').length - 1) {
                $('.digit')
                    .eq(index + 1)
                    .focus();
            }
        }
    });

    $('.digit').on('keydown', function (e) {
        if (e.key === 'Backspace') {
            var $this = $(this);
            var index = $('.digit').index($this);
            if (index > 0 && $this.val().length === 0) {
                $('.digit')
                    .eq(index - 1)
                    .focus();
            }
        }
    });

    $('.digit').on('input', function () {
        if ($(this).val().length > 0) {
            $('#btn_VerifyOTP').attr('disabled', false);
        }
    });

    $('#btn_VerifyOTP').on('click', function () {
        var digitVal = '';
        $('.digit').each(function () {
            digitVal += $(this).val();
        });

        if (digitVal != otp) {
            $('#digit_Error').show();
        } else {
            $('#digit_Error').hide();
            $('#sec_OTP').hide();
            $('#sec_Details').show();
            $('#input_AddMoney').focus();
            removeOTPFrmUrl();
        }
    });

    $('#view_SuccessDetails').on('click', function (e) {
        $('#sec_Details').hide();
        $('#sec_Success').show();
    });

    $('#view_FailedDetails').on('click', function (e) {
        $('#sec_Details').hide();
        $('#sec_Failed').show();
    });

    //Modal
    $('#view_TransactionHistory').on('click', function (e) {
        e.preventDefault();
        $('#modal_TransactionHistory').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    });

    $('.close').on('click', function (e) {
        e.preventDefault();
        $('#modal_TransactionHistory').css('display', 'none');
        $('body').css('overflow', 'auto');
    });

    $('#modal_TransactionHistory').click(function (e) {
        e.stopPropagation();
        $('#modal_TransactionHistory').css('display', 'none');
        $('body').css('overflow', 'auto');
    });

    $('.modal-content').on('click', function (e) {
        e.stopPropagation();
    });
});

function selectAny(value) {
    if (value === 'VRN / VIN / Chasis No.') {
        $('#input_Number').attr('placeholder', 'Enter VRN / VIN / Chasis No.');
    } else if (value === 'Customer ID') {
        $('#input_Number').attr('placeholder', 'Enter Customer ID');
    } else if (value === 'CP ID') {
        $('#input_Number').attr('placeholder', 'Enter CP ID');
    }
}

function updateTimer() {
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;

    var timerDisplay = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    $('#countdown').text(timerDisplay);

    if (timeRemaining > 0) {
        timeRemaining--;
    } else {
        clearInterval(timerInterval);
        $('.timer').hide();
        $('#link_resendOTP').attr('disabled', false);
        $('#btn_VerifyOTP').attr('disabled', false);
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function generateOTP() {
    for (var i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    var currentUrl = window.location.href;
    var urlWithOTP = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'otp=' + otp;
    window.history.pushState({}, '', urlWithOTP);
}

function removeOTPFrmUrl() {
    var url = new URL(window.location.href);
    url.searchParams.delete('otp');
    var newUrl = url.toString();
    window.history.pushState({}, '', newUrl);
}
