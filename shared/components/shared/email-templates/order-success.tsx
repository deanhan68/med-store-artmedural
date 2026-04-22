import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  items,
}) => {
  return (
    <div style={{ backgroundColor: '#f4f4f7', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <table
        width="100%"
        border={0}
        cellPadding="0"
        cellSpacing="0"
        style={{ 
          maxWidth: '500px', 
          margin: '0 auto', 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
        }}>
        
        {/* Шапка с логотипом */}
        <tr>
          <td style={{ backgroundColor: '#2563eb', padding: '30px', textAlign: 'center' }}>
            <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>
              ArtMedUral
            </h1>
          </td>
        </tr>

        {/* Контент */}
        <tr>
          <td style={{ padding: '40px 30px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', color: '#1e293b', margin: '0 0 10px' }}>
              Спасибо за покупку
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '20px' }}>
              Ваш заказ №{orderId} оплачен. Список товаров:
            </p>
            
            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: '0 0 30px 0' }}>
            {items.map((item) => (
            <li key={item.id} style={{ marginBottom: '12px', fontSize: '15px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              — <b>{item.productItem.product.name}</b> <br />
              <span style={{ color: '#64748b', fontSize: '14px' }}>
                {item.productItem.price} ₽ x {item.quantity} шт. = <b>{item.productItem.price * item.quantity} ₽</b>
              </span>
            </li>
          ))}
        </ul>

            {/* Блок с ценой */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px', marginBottom: '10px', border: '1px dashed #cbd5e1' }}>
              <span style={{ fontSize: '14px', color: '#64748b', display: 'block', marginBottom: '5px' }}>
                Сумма к оплате (со скидкой 15%):
              </span>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
                {totalAmount} ₽
              </span>
            </div>
          </td>
        </tr>

        {/* Футер */}
        <tr>
          <td style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#94a3b8', backgroundColor: '#fcfcfd', borderTop: '1px solid #f1f5f9' }}>
            © 2026 ArtMedUral. Все права защищены.
          </td>
        </tr>
      </table>
    </div>
  );
};