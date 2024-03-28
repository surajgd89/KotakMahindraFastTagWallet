$(document).ready(function () {
    $('#searchMerchantId').multipleSelect({
        /* firstItemChecksAll:true,
		textFormatFunction: function(options) {
			var selectedOptions = options.filter(":selected");
			var i;
			var values = "";
			for( i=0; i < selectedOptions.length; i++ )
			{
				if (selectedOptions[i].selected && (selectedOptions.value != "")) 
				{
					if ( values != "" ) 
					  values += ", ";
					values += selectedOptions[i].value;            
				}

			}
			var countOfSelected = selectedOptions.length;
			var size = options.length;
			switch(countOfSelected) {
			   case 0: return "Merchant ID";
			   case 1: return values;
			   case options.length: return "All Merchant IDs";
			   default: return values;
			}
		},
		icon : {},
		emptyText : "Merchant ID", */
        filter: true,
        placeholder: '<i>Merchant ID<i>',
        allSelected: '<i>All Merchant IDs<i>',
        width: 250,
    });

    $('#searchSubAccountId').multipleSelect({
        /* firstItemChecksAll:true,
		textFormatFunction: function(options) {
			var selectedOptions = options.filter(":selected");
			var i;
			var values = "";
			for( i=0; i < selectedOptions.length; i++ )
			{
				if (selectedOptions[i].selected && (selectedOptions.value != "")) 
				{
					if ( values != "" ) 
					  values += ", ";
					values += selectedOptions[i].value;
				}

			}
			var countOfSelected = selectedOptions.length;
			var size = options.length;
			switch(countOfSelected) {
			   case 0: return "Sub Account ID";
			   case 1: return values;
			   case options.length: return "All Sub Account IDs";
			   default: return values;
			}
		},
		icon : {},
		emptyText : "Sub Account ID", */
        placeholder: '<i>Sub Account ID<i>',
        allSelected: '<i>All Sub Account IDs<i>',
        width: 250,
    });
    /*var dates = $(".pickDate").datepick({
		dateFormat: 'dd-mm-yyyy',
	//	changeMonth:'true' ,
		changeYear:'true',
		maxDate: 'today',
		onSelect: function(selectedDate) {
			var option;
			inst= $(this).data( "datepick" );
			if(inst.selectedDates.length==0)
				return;
			var sep = "-";
			
			if(this.id=="startDate") {
				option="minDate";
			} else {
				option="maxDate";
			}
			
			var value = '';
			var altValue='';
			
			for (var i = 0; i < inst.selectedDates.length; i++) {
				value += ((i > 0 ? sep : '') + $.datepick.formatDate(inst.get('dateFormat'), inst.selectedDates[i], inst.getConfig()));
				altValue += (i > 0 ? sep : '') + $.datepick.formatDate(inst.get('dateFormat'), inst.selectedDates[i], inst.getConfig());
			}
			
			if(option=="minDate")
				dates.not($("#startDate")).datepick("option",option, value);
			else {
				dates.not($("#endDate")).datepick("option",option, value);
			}
		}
	});*/

    $('#FailureAnalysisReportForm').validate({
        rules: {
            startDate: {
                required: true,
            },
            endDate: {
                required: true,
            },
        },
        groups: {
            searchDateRange: 'startDate endDate',
        },
        messages: {
            startDate: {
                required: 'Select valid date range.',
            },
            endDate: {
                required: 'Select valid date range.',
            },
        },
    });

    var todayDate = new Date();
    $('#startDate').datetimepicker({
        maxDate: 0,
        scrollMonth: false,
        timepicker: false,
        format: 'd-m-Y',
        onSelectDate: function (startDate) {
            $('#endDate').val('');
            var xDate = new Date(startDate);
            xDate.setMonth(xDate.getMonth() + 1, xDate.getDate());
            if (xDate > todayDate) xDate = todayDate;
            $('#endDate').datetimepicker({
                maxDate: xDate,
                minDate: startDate,
            });
        },
    });

    /*$("#searchFromOrderDatetime").datetimepicker({
		maxDate: 0,
		defaultTime:'00:00',
			format:'d-m-Y H:i', 
			onSelectDate: function(startDate) {
				var xDate = new Date(startDate);
				xDate.setMonth(xDate.getMonth()+6, xDate.getDate());
				if(xDate>todayDate) xDate=todayDate;
				$("#searchToOrderDatetime").datetimepicker({maxDate: xDate, minDate:startDate});
			}
		});
	$("#searchToOrderDatetime").datetimepicker({
		maxDate: 0,  
		format:'d-m-Y H:i',  
		onSelectDate: function(endDate) {
				var yDate = new Date(endDate);
				yDate.setMonth(yDate.getMonth()-6, yDate.getDate());
				$("#searchFromOrderDatetime").datetimepicker({maxDate:endDate, minDate: yDate});
				
			}
		});*/
    $('#endDate').datetimepicker({
        maxDate: 0,
        scrollMonth: false,
        timepicker: false,
        format: 'd-m-Y',
        onSelectDate: function (endDate) {
            var yDate = new Date(endDate);
            yDate.setMonth(yDate.getMonth() - 1, yDate.getDate());
            $('#startDate').datetimepicker({
                maxDate: endDate,
                minDate: yDate,
            });
        },
    });

    /* $("#startDate").click(function(){ $(".pickDate").datepicker("show"); }); */

    $('.searchRecords').click(function (e) {
        $('#command').attr('value', 'navigateFailureAnalysis');
        $('#FailureAnalysisReportForm').submit();
        e.preventDefault();
    });

    var chart;
    var crdcCount = parseInt($.trim($('#crdcCount').html()));
    var dbcrdCount = parseInt($.trim($('#dbcrdCount').html()));
    var nbkCount = parseInt($.trim($('#nbkCount').html()));
    var cashCount = parseInt($.trim($('#cashCount').html()));
    var mobpCount = parseInt($.trim($('#mobpCount').html()));
    var ivrsCount = parseInt($.trim($('#ivrsCount').html()));
    var wltCount = parseInt($.trim($('#wltCount').html()));
    var emiCount = parseInt($.trim($('#emiCount').html()));
    var upiCount = parseInt($.trim($('#upiCount').html()));

    var crdcVisible = true;
    var dbcrdVisible = true;
    var nbkVisible = true;
    var cashVisible = true;
    var mobpVisible = true;
    var ivrsVisible = true;
    var wltVisible = true;
    var emiVisible = true;
    var upiVisible = true;

    if (isNaN(crdcCount)) {
        crdcCount = 0;
        crdcVisible = false;
    }
    if (isNaN(dbcrdCount)) {
        dbcrdCount = 0;
        dbcrdVisible = false;
    }
    if (isNaN(nbkCount)) {
        nbkCount = 0;
        nbkVisible = false;
    }
    if (isNaN(cashCount)) {
        cashCount = 0;
        cashVisible = false;
    }
    if (isNaN(mobpCount)) {
        mobpCount = 0;
        mobpVisible = false;
    }
    if (isNaN(ivrsCount)) {
        ivrsCount = 0;
        ivrsVisible = false;
    }
    if (isNaN(wltCount)) {
        wltCount = 0;
        wltVisible = false;
    }
    if (isNaN(emiCount)) {
        emiCount = 0;
        emiVisible = false;
    }
    if (isNaN(upiCount)) {
        upiCount = 0;
        upiVisible = false;
    }

    var crdcPerc = $.trim($('#crdcPerc').html());
    var dbcrdPerc = $.trim($('#dbcrdPerc').html());
    var nbkPerc = $.trim($('#nbkPerc').html());
    var cashPerc = $.trim($('#cashPerc').html());
    var mobpPerc = $.trim($('#mobpPerc').html());
    var ivrsPerc = $.trim($('#ivrsPerc').html());
    var wltPerc = $.trim($('#wltPerc').html());
    var emiPerc = $.trim($('#emiPerc').html());
    var upiPerc = $.trim($('#upiPerc').html());
    //alert(crdcPerc + " - DBCRD- " + dbcrdPerc + " -NBK- " + nbkPerc + " -CARCH- " + cashPerc + " -MOB- " + mobpPerc + " -IVRS- " + ivrsPerc + " -WLT- " + wltPerc + " -EMI- " + emiPerc);
    //alert(crdcCount + " - DBCRD- " + dbcrdCount + " -NBK- " + nbkCount + " -CARCH- " + cashCount + " -MOB- " + mobpCount + " -IVRS- " + ivrsCount + " -WLT- " + wltCount + " -EMI- " + emiCount);
    if (crdcPerc == '') crdcPerc = '0.0';
    if (dbcrdPerc == '') dbcrdPerc = '0.0';
    if (nbkPerc == '') nbkPerc = '0.0';
    if (cashPerc == '') cashPerc = '0.0';
    if (mobpPerc == '') mobpPerc = '0.0';
    if (ivrsPerc == '') ivrsPerc = '0.0';
    if (wltPerc == '') wltPerc = '0.0';
    if (emiPerc == '') emiPerc = '0.0';
    if (upiPerc == '') upiPerc = '0.0';
    var check = false;

    if ($('#container2').length > 0) {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container2',
                plotShadow: false,
                backgroundColor: '',
                y: 0,
            },
            title: { enabled: false },
            subtitle: { enabled: false },
            tooltip: {
                enabled: true,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                    padding: '5px',
                    whiteSpace: 'nowrap',
                },
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        connectorColor: '#484848',
                    },
                    x: 100,
                    startAngle: 0,
                    endAngle: 360,
                },
            },
            colors: [
                '#F4C84F',
                '#60AAE9',
                '#627AAD',
                '#AECE4E',
                '#D762D6',
                '#CA99D0',
                '#94DCC4',
                '#FD971E',
                '#259f9d',
            ],
            series: [
                {
                    type: 'pie',
                    name: 'Transaction Count',
                    innerSize: '50%',
                    states: {
                        hover: {
                            enabled: false,
                        },
                    },
                    data: [
                        {
                            name: 'Credit Cards: ' + crdcPerc + '%',
                            y: crdcCount,
                            sliced: false,
                            selected: true,
                            visible: crdcVisible,
                        },
                        {
                            name: 'Debit Cards: ' + dbcrdPerc + '%',
                            y: dbcrdCount,
                            sliced: false,
                            selected: true,
                            visible: dbcrdVisible,
                        },
                        {
                            name: 'Netbanking: ' + nbkPerc + '%',
                            y: nbkCount,
                            sliced: false,
                            selected: true,
                            visible: nbkVisible,
                        },
                        {
                            name: 'Cash Cards: ' + cashPerc + '%',
                            y: cashCount,
                            sliced: false,
                            selected: true,
                            visible: cashVisible,
                        },
                        {
                            name: 'Mobile Payments: ' + mobpPerc + '%',
                            y: mobpCount,
                            sliced: false,
                            selected: true,
                            visible: mobpVisible,
                        },
                        {
                            name: 'IVRS: ' + ivrsPerc + '%',
                            y: ivrsCount,
                            sliced: false,
                            selected: true,
                            visible: ivrsVisible,
                        },
                        {
                            name: 'Wallet: ' + wltPerc + '%',
                            y: wltCount,
                            sliced: false,
                            selected: true,
                            visible: wltVisible,
                        },
                        {
                            name: 'EMI: ' + emiPerc + '%',
                            y: emiCount,
                            sliced: false,
                            selected: true,
                            visible: emiVisible,
                        },
                        {
                            name: 'Unified Payments: ' + upiPerc + '%',
                            y: upiCount,
                            sliced: false,
                            selected: true,
                            visible: upiVisible,
                        },
                    ],
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            plotOptions: {
                                pie: {
                                    dataLabels: {
                                        enabled: false,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    $('a.hyperLink4').click(function (e) {
        if ($('#searchMerchantId').val() != null) {
            var str = $('#searchMerchantId').val();
            $('#searchRegId').val($.trim(str));
        } else {
            $('#searchRegId').val('');
        }
        $('#orderCardType').val(
            $.trim($(this).closest('tr').find('.detailsCardType').val())
        );
        $('#orderOptionType').val(
            $.trim($(this).closest('tr').find('.detailsOptionType').val())
        );
        $('#orderCardName').val(
            $.trim($(this).closest('tr').find('.detailCardName').html())
        );
        $('#command').attr('value', 'fetchFailureTransDetails');
        $('#FailureAnalysisReportForm').submit();
    });

    $('a.modal-popup').on('click', function (e) {
        if ($('#searchMerchantId').val() != null) {
            var str = $('#searchMerchantId').val();
            $('#searchRegId').val($.trim(str));
        } else {
            $('#searchRegId').val('');
        }
        var cardType = $(this).closest('tr').find('.detailsCardType').val();
        var optionType = $(this).closest('tr').find('.detailsOptionType').val();
        var cardName = $.trim(
            $(this).closest('tr').find('.detailCardName').html()
        );
        var url =
            '/reports/failureAnalysisReport.do?command=fetchFailureDetails&startDate=' +
            $('#startDate').val() +
            '&endDate=' +
            $('#endDate').val() +
            '&detailsOptionType=' +
            optionType +
            '&detailsCardType=' +
            cardType +
            '&detailsCardName=' +
            cardName +
            '&searchRegId=' +
            $('#searchRegId').val() +
            '&popUpShow=popUpDetail&rndTkn=' +
            $('#rndTkn').val();
        $.post(url, function (data) {
            if ($(data).length > 0) {
                $('#refreshPopUp').html(data);
            }

            var loginBox = '#payment-type-details';
            //Fade in the Popup and add close button
            $(loginBox).fadeIn(300);

            //Set the center alignment padding + border
            var popMargTop = ($(loginBox).height() + 24) / 2;
            var popMargLeft = ($(loginBox).width() + 24) / 2;

            $(loginBox).css({
                'margin-top': -popMargTop,
                'margin-left': -popMargLeft,
            });

            // Add the mask to body
            $('body').addClass('modal-open');
            $('body').append('<div id="mask"></div>');
            $('#mask').fadeIn(300);
            $('html').css('overflow', 'hidden');

            e.preventDefault();
        });

        return false;
    });

    // When clicking on the button close or the mask layer the popup closed
    /* $('a.close, #mask').on('click',function() { 
	  $('#mask , .modal-main').fadeOut(300 ,function() {
		$('#mask').remove();
		$('body').removeClass('modal-open');
		$('html').css('overflow-y','scroll');
	});
	return false;
	}); */

    $('#mask').on('click', function () {
        $('#mask , .modal-main').fadeOut(300, function () {
            $('#mask').remove();
            $('body').removeClass('modal-open');
            $('html').css('overflow-y', 'scroll');
        });
        return false;
    });

    $(document).on('click', 'a.close', function () {
        $('#mask , .modal-main').fadeOut(300, function () {
            $('#mask').remove();
            $('body').removeClass('modal-open');
            $('html').css('overflow-y', 'scroll');
        });
        return false;
    });
});

/*Start: Custom Scroll bar*/
$(function () {
    $('#payment-type-details-list').mCustomScrollbar({
        scrollButtons: {
            enable: false,
        },
        theme: 'dark-thick',
    });
    $('.mCSB_draggerRail').css('background-color', 'transparent');
    $('.mCSB_dragger_bar')
        .addClass('mini-scrollbar')
        .css({ opacity: '1', width: '4px' });
});
