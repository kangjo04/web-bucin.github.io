$(document).ready(function() {
    // progress bar
    setTimeout(function() {
        pertanyaanPertama();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init() {
    document.getElementById('titleWeb').innerHTML = CONFIG.titleWeb;
    $('#title').text(CONFIG.title);
    $('#desc').text(CONFIG.desc);
    $('#yes').text(CONFIG.btnYes);
    $('#no').text(CONFIG.btnNo);

    var xYes = (0.9 * $(window).width() - $('#yes').width() - $('#no').width()) / 2;
    var xNo = xYes + $('#yes').width() + 0.1 * $(window).width();
    var y = 0.75 * $(window).height();
    $('#yes').css("left", xYes);
    $('#yes').css("top", y);

    $('#no').css("left", xNo);
    $('#no').css("top", y);
}

function pertanyaanPertama() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/logi.gif',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Gambar Kustom',
        confirmButtonText: CONFIG.btnIntro
    }).then(function() {
        $('.content').show(200);
        var audio = new Audio('sound/sound1.mp3');
        audio.play();
    })
}

// tukar posisi tombol
function tukarTombol() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNo = $('#no').css("top");
    var leftYes = $('#yes').css("left");
    var topYes = $('#yes').css("top");
    $('#no').css("left", leftYes);
    $('#no').css("top", topYes);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNo);
}

// pindahkan posisi tombol secara acak
function pindahkanTombol() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init();

var n = 0;
$('#no').mousemove(function() {
    if (Math.random() < 0.5 || n == 1)
        tukarTombol();
    else
        pindahkanTombol();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900)
        tukarTombol();
})

// buat teks di input
function buatTeks() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("buatTeks()", 1);
}

// tampilkan popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=buatTeks() placeholder='karena....'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            })
        }
    })
})
