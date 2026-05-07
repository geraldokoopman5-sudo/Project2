export const BookingItem = ({ booking }) => (
  <Card className="hover:shadow-md transition-shadow group">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 h-48 md:h-auto overflow-hidden relative">
        <img src={booking.image} alt={booking.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-sm left-sm bg-secondary-container text-on-secondary-container font-label-caps text-[10px] px-sm py-1 rounded-full">
          {booking.status}
        </span>
      </div>
      <div className="p-lg flex-grow grid md:grid-cols-3 gap-lg">
        <div className="md:col-span-2">
          <h3 className="font-h3 text-h3 text-primary mb-xs">{booking.clientName}</h3>
          <div className="flex flex-wrap gap-md items-center text-on-surface-variant mb-md">
             <div className="flex items-center gap-xs"><Icon name="local_shipping" className="text-[18px]" /> {booking.vehicle}</div>
             <div className="flex items-center gap-xs"><Icon name="calendar_today" className="text-[18px]" /> {booking.dates}</div>
          </div>
          {booking.note && (
            <div className="p-sm bg-surface-container-low rounded-lg inline-flex items-center gap-sm">
              <Icon name="info" className="text-primary" />
              <span className="font-body-sm italic">{booking.note}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between items-end border-l border-outline-variant pl-lg">
          <div className="text-right">
            <span className="block font-label-caps text-on-surface-variant uppercase text-xs">Total Cost</span>
            <span className="block font-h2 text-h2 text-primary">{booking.cost}</span>
          </div>
          <div className="flex gap-sm w-full">
            <Button variant="danger" className="flex-1">Reject</Button>
            <Button variant="primary" className="flex-1">Approve</Button>
          </div>
        </div>
      </div>
    </div>
  </Card>
);