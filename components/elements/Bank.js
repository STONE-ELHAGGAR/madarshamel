const Bank = () => {
    return (
    <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
        <h5 className="text-center">Ahmed Elhaggar</h5>
        <h5>Balance: <code>10000</code> SAR | Debt: <code>0</code> SAR</h5><br />
        <h5>Bank Request</h5>
        <input type="text" placeholder="amount" name="amount" className="form-control amount"/><br />
        <select name="case" className="form-control case">
            <option value="0">Withdraw</option>
            <option value="1">Deposit</option>
        </select><br />
        <textarea placeholder="Additional Details" className="form-control additionalDetails"></textarea><br />
        <button className="btn btn-square">Create</button>
    </div>
    )
}

export default Bank;