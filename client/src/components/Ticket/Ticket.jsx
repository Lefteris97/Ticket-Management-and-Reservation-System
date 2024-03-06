import './Ticket.css';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';

const Ticket = (props) => {
    const svgBase64 = props.userTicket && props.userTicket.circuit_map ? `data:image/svg+xml;base64,${btoa(String.fromCharCode(...props.userTicket.circuit_map.data))}` : '';

    const ticketRef = useRef(null);

    const handleDownloadPDF = () => {
        // Get the element to be converted to PDF
        const ticketContent = document.getElementById('ticketContent');

        // Use html2canvas to capture the screenshot of the element
        html2canvas(ticketContent, { scale: 1 })
            .then((canvas) => {
                // Convert the canvas to a PDF using jspdf
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');

                // Calculate the width and height of the PDF page
                const pdfWidth = 210; // A4 width in mm
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                // Add the image to the PDF
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                // Save the PDF
                pdf.save('ticket.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    };

    return (
        <div className='ticket'>
            <div className="ticketModal">
                <div id="ticketContent" className="ticketDetails" ref={ticketRef}>
                    <div className="ticketHeader">
                        <h1>{props.userTicket.event_name}</h1>
                        <h2># {props.userTicket.ticket_id}</h2>
                    </div>
                    <img className='ticketCircuit' src={svgBase64} alt='circuit map'/>
                    <h2>Stand: {props.userTicket.stand_name}</h2>
                    <h2>Name: {props.userTicket.fname} {props.userTicket.lname}</h2>
                    
                    {/* <h2>User Email: {props.userTicket.email}</h2> */}
                    <QRCode className='QRCode' value={`TicketID: ${props.userTicket.ticket_id}, UserID: ${props.userTicket.user_id}, Event: ${props.userTicket.event_name}, Stand: ${props.userTicket.stand_name}, FName: ${props.userTicket.fname}, LName: ${props.userTicket.lname}`}/> 
                    {/* User Email: ${props.userEmail} */}
                </div>
                <div className="buttons">
                    <button className="closeButton" onClick={() => props.setSelected(null)}>Close</button>
                    <button className="downloadButton" onClick={handleDownloadPDF}>Download PDF</button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
