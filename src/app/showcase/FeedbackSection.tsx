import avatarPhoto from "@salesforce-ux/design-system/assets/images/avatar1.jpg";
import { Avatar, type AvatarSize } from "../components/feedback/Avatar";
import { Badge } from "../components/feedback/Badge";
import { Spinner, type SpinnerSize } from "../components/feedback/Spinner";
import { ShowcaseExample } from "./ShowcaseExample";

const AVATAR_SIZES: AvatarSize[] = ["x-small", "small", "medium", "large"];
const SPINNER_SIZES: SpinnerSize[] = ["xx-small", "x-small", "small", "medium", "large"];

export function FeedbackSection() {
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="feedback">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Avatar · Badge · Spinner</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Avatar — sizes (image, square)" visualId="avatar-sizes">
          {AVATAR_SIZES.map((s) => (
            <Avatar key={s} size={s} content={{ kind: "image", src: avatarPhoto, alt: "Feng Yue" }} className="slds-m-right_small" />
          ))}
        </ShowcaseExample>
        <ShowcaseExample title="Avatar — circle / initials / icon" visualId="avatar-kinds">
          <Avatar shape="circle" content={{ kind: "image", src: avatarPhoto, alt: "Mansoor Ahmad" }} className="slds-m-right_small" />
          <Avatar content={{ kind: "initials", initials: "FY", title: "Feng Yue", iconName: "standard:user" }} className="slds-m-right_small" />
          <Avatar shape="circle" content={{ kind: "initials", initials: "AC", title: "ArmadaCare", iconName: "standard:account" }} className="slds-m-right_small" />
          <Avatar size="small" content={{ kind: "icon", iconName: "standard:user", assistiveText: "User" }} />
        </ShowcaseExample>
        <ShowcaseExample title="Badge — default / inverse / lightest" visualId="badges">
          <Badge className="slds-m-right_x-small">Draft</Badge>
          <Badge variant="inverse" className="slds-m-right_x-small">
            current
          </Badge>
          <Badge variant="lightest">Approved</Badge>
        </ShowcaseExample>
        <ShowcaseExample title="Spinner — sizes (brand, inline)" visualId="spinner-sizes">
          <div className="slds-grid slds-wrap slds-grid_vertical-align-center">
            {SPINNER_SIZES.map((s) => (
              <div key={s} className="slds-is-relative slds-m-right_large slds-p-around_x-large">
                <Spinner size={s} variant="brand" layout="inline" assistiveText={`Loading (${s})`} />
              </div>
            ))}
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Spinner — base / overlay on a card" visualId="spinner-overlay">
          <div className="slds-is-relative slds-box">
            <p>Card Transactions</p>
            <p className="slds-text-body_small slds-text-color_weak">Loading related records…</p>
            <p className="slds-p-vertical_large"> </p>
            <Spinner size="medium" variant="base" />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Spinner — inverse" visualId="spinner-inverse">
          <div className="slds-theme_inverse slds-p-around_large slds-is-relative">
            <Spinner size="small" variant="inverse" layout="inline" />
          </div>
        </ShowcaseExample>
      </div>
    </section>
  );
}
