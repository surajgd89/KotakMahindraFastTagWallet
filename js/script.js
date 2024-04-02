$(function () {
    $('#OTP_Sec').hide();
    $('#Details_Sec').hide();
    let date = new Date();
    $('#currentYear').text(date.getFullYear());

    $('#submit_Btn').on('click', function () {
        if ($('#inputValue').val().length > 0) {
            $('#Initial_Sec').hide();
            $('#OTP_Sec').fadeIn(300);
        } else {
            $('#inputValue_Error').show();
        }
    });

    $('#verify_Btn').on('click', function () {
        $('#OTP_Sec').hide();
        $('#Details_Sec').fadeIn(300);
    });

    $('#selectAnyOne').on('change', function () {
        let value = $(this).val();
        onValueSelect(value);
    });

    function onValueSelect(value) {
        if (value === 'VRN / VIN / Chasis No.') {
            $('#inputValue').attr(
                'placeholder',
                'Enter VRN / VIN / Chasis No.'
            );
        } else if (value === 'Customer ID') {
            $('#inputValue').attr('placeholder', 'Enter Customer ID');
        } else if (value === 'CP ID') {
            $('#inputValue').attr('placeholder', 'Enter CP ID');
        }
    }

    onValueSelect($('#selectAnyOne').val());

    //TIMER

    var timeRemaining = 120;
    var timerInterval;

    function updateTimer() {
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = timeRemaining % 60;

        var timerDisplay =
            ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        $('#countdown').text(timerDisplay);

        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            $('.timer').hide();
            $('#resendOTP').attr('disabled', false);
        }
    }

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    $('#resendOTP').on('click', function (e) {
        e.preventDefault();
        clearInterval(timerInterval);
        timeRemaining = 120;
        $('.timer').show();
        $('#resendOTP').attr('disabled', true);
        updateTimer();
        startTimer();
    });

    startTimer();

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

    //Modal

    $('#view_History').on('click', function (e) {
        e.preventDefault();
        $('#txnHistory_Modal').css('display', 'flex');
    });

    $('.close').on('click', function (e) {
        e.preventDefault();
        $('#txnHistory_Modal').css('display', 'none');
    });

    $('#txnHistory_Modal').click(function (e) {
        e.stopPropagation();
        $('#txnHistory_Modal').css('display', 'none');
    });

    $('.modal-content').on('click', function (e) {
        e.stopPropagation();
    });
});
