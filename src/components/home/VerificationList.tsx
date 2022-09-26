import { FeaturedIcon, LohkoImage, VerificationTick } from "../../assets";

export default function VerificationList() {
  return (
    <div className="verification-list">
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Type</th>
            <th>Asset Class</th>
            <th>Last verified</th>
            <th>Publisher</th>
            <th>Issuer/s</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex">
                <img className="image" src={LohkoImage} alt="lohko" />
                <div className="dataset">
                  <div className="name"> Lohko Gold</div>
                  <div className="address">0x80bf3a23...89764372</div>
                </div>
              </div>
            </td>
            <td>Digital Asset</td>
            <td>Gold</td>
            <td>an hour ago</td>
            <td>
              <div className="flex">
                <div> Lohko Wallet Pte Ltd</div>
                <VerificationTick />
              </div>
            </td>
            <td>
              <div className="flex">
                <div> Lohko Wallet Pte Ltd</div>
                <VerificationTick />
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
