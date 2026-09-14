window.addEventListener("scroll", function () {
    const dauTrang = document.querySelector(".dau-trang");

    if (!dauTrang) return;

    if (window.scrollY <= 10) {
        dauTrang.classList.remove("an-header");
        dauTrang.classList.remove("nav-dinh");
    } else {
        dauTrang.classList.add("an-header");
        dauTrang.classList.add("nav-dinh");
    }
});

const vungTruot = document.getElementById('vungTruot');
const danhSachSlide = document.querySelectorAll('.anh-slide');
const tongSlide = danhSachSlide.length; 

let viTri = 1; 
let batDauX = 0, dangKeo = false;

vungTruot.style.transform = `translateX(${-viTri * 100}%)`;

vungTruot.addEventListener('mousedown', batDauKeo);
vungTruot.addEventListener('touchstart', batDauKeo, { passive: true });

function batDauKeo(e) {
    dangKeo = true;
    batDauX = e.type.includes('touch') ? e.touches[0].clientX : e.pageX;
    vungTruot.style.transition = 'none';
}

window.addEventListener('mousemove', dangKeoMove);
window.addEventListener('touchmove', dangKeoMove, { passive: true });

function dangKeoMove(e) {
    if (!dangKeo) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.pageX;
    const kc = currentX - batDauX;
    vungTruot.style.transform = `translateX(calc(${-viTri * 100}% + ${kc}px))`;
}

function ketThuc(e) {
    if (!dangKeo) return;
    dangKeo = false;
    const ketThucX = e.changedTouches ? e.changedTouches[0].clientX : e.pageX;
    const kc = ketThucX - batDauX;

    if (kc < -50) {
        viTri++;
    } else if (kc > 50) {
        viTri--;
    }
    capNhatViTri();
}

window.addEventListener('mouseup', ketThuc);
window.addEventListener('touchend', ketThuc);

function capNhatViTri() {
    vungTruot.style.transition = 'transform 0.4s ease-in-out';
    vungTruot.style.transform = `translateX(${-viTri * 100}%)`;
}

vungTruot.addEventListener('transitionend', () => {
    if (viTri >= tongSlide - 1) {
        vungTruot.style.transition = 'none';
        viTri = 1;
        vungTruot.style.transform = `translateX(${-viTri * 100}%)`;
    }
   
    if (viTri <= 0) {
        vungTruot.style.transition = 'none';
        viTri = tongSlide - 2;
        vungTruot.style.transform = `translateX(${-viTri * 100}%)`;
    }
});

setInterval(function() {
    viTri++;
    capNhatViTri();
}, 3000);

function slideSau() {
    viTri++;
    capNhatViTri();
}

function xuLyLuu() {
    const form = document.getElementById('formBaiViet');
    if (form.checkValidity()) {
        alert('Đã lưu bản nháp thành công!');
        form.reset(); 
    } else {
        form.reportValidity(); 
    }
}

function xuLyDang(event) {
    event.preventDefault(); 
    const form = document.getElementById('formBaiViet');
    if (form.checkValidity()) {
        alert('Đã đăng bài viết thành công!');
        form.reset(); 
    } else {
        form.reportValidity();
    }
}

const cacHinhNho = document.querySelectorAll('.ds .hinh-nho');
const hinhLon = document.getElementById('hinh-lon');
cacHinhNho.forEach(function(hinhNho) {
    hinhNho.addEventListener('click', function() {
        hinhLon.src = this.src;
        document.querySelector('.ds .hinh-nho.active').classList.remove('active');
        this.classList.add('active');
    });
});

function doiSkill(element) {

    document.querySelectorAll('.icon').forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    let tieuDeMoi = element.getAttribute('data-tieu-de');
    let noiDungMoi = element.getAttribute('data-noidung');

    document.getElementById('tieu-de-skill').innerText = tieuDeMoi;
    document.getElementById('mo-ta-skill').innerHTML = noiDungMoi;
}
