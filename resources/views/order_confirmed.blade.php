<div style="font-family: sans-serif; background: #000; color: #fff; padding: 20px; border-radius: 10px;">
    <h2 style="color: #00ff9d;">New Order Received!</h2>
    <p>A new order has been placed in the system.</p>
    
    <div style="background: #111; padding: 15px; border: 1px solid #333; border-radius: 8px;">
        <h3 style="color: #00ff9d;">Customer Details</h3>
        <p><strong>Name:</strong> {{ $order->user->name }}</p>
        <p><strong>Email:</strong> {{ $order->user->email }}</p>
        <p><strong>Phone:</strong> {{ $order->user->phone ?? 'N/A' }}</p>
        <p><strong>City:</strong> {{ $order->user->city ?? 'N/A' }}</p>
    </div>

    <div style="margin-top: 20px;">
        <h3 style="color: #00ff9d;">Order Summary</h3>
        <p><strong>Order #:</strong> {{ $order->order_number }}</p>
        <p><strong>Total Amount:</strong> ${{ number_format($order->total_amount, 2) }}</p>
        <p><strong>Status:</strong> {{ $order->status }}</p>
    </div>
</div>
