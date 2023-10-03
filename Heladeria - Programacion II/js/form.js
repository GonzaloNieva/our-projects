window.onload = function() {
    var modal = document.getElementById('myModal');
    var closeBtn = document.getElementById('closeBtn');

    modal.style.display = 'block';

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};