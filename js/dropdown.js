document.getElementById('dropdownMenuButton').addEventListener('click', function(event) {
    event.preventDefault();
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('hidden');
});

document.addEventListener('click', function(event) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownMenuButton = document.getElementById('dropdownMenuButton');
    if (!dropdownMenu.contains(event.target) && !dropdownMenuButton.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});