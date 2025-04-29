document.getElementById('ventaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    const response = await fetch('/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto, cantidad, precio })
    });

    const result = await response.json();
    alert(result.message);
    fetchSales(); // Recargar lista de ventas después de registrar
});

async function fetchSales() {
    const response = await fetch('/ventas');
    const sales = await response.json();

    const salesList = document.getElementById('salesList');
    salesList.innerHTML = ''; // Limpiar lista antes de mostrar

    sales.forEach(sale => {
        const saleItem = document.createElement('div');
        saleItem.classList.add('sale-item');
        saleItem.textContent = `Producto: ${sale.producto}, Cantidad: ${sale.cantidad}, Precio: ${sale.precio}`;
        salesList.appendChild(saleItem);
    });
}
