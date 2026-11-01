import { EnvironmentChecks } from "./EnvironmentChecks";
import { FoundationsSection } from "./FoundationsSection";
import { IconsSection } from "./IconsSection";
import { ButtonsSection } from "./ButtonsSection";
import { FormsSection } from "./FormsSection";
import { FeedbackSection } from "./FeedbackSection";
import { OverlaysSection } from "./OverlaysSection";
import { FigmaCompareSection } from "./FigmaCompareSection";
import { FigmaComparePatterns } from "./FigmaComparePatterns";
import { ShellSection } from "./ShellSection";
import { PageSection } from "./PageSection";
import { DataSection } from "./DataSection";
import { CardsSection } from "./CardsSection";
import { DialogsSection } from "./DialogsSection";

/** /showcase — every design-system component in every variant and state. Phases 1–3: foundations, primitives, patterns. */
export function ShowcasePage() {
  return (
    <main className="slds-p-around_large">
      <header className="slds-m-bottom_large">
        <h1 className="slds-text-heading_large">ArmadaCare Admin Portal — Design System</h1>
        <p className="slds-text-body_regular slds-text-color_weak">
          SLDS 1 (@salesforce-ux/design-system 2.264.3) · ArmadaCare theme · Phases 1–3: foundations, primitives and patterns
        </p>
      </header>
      <EnvironmentChecks />
      <FoundationsSection />
      <IconsSection />
      <ButtonsSection />
      <FormsSection />
      <FeedbackSection />
      <OverlaysSection />
      <ShellSection />
      <PageSection />
      <DataSection />
      <CardsSection />
      <DialogsSection />
      <FigmaCompareSection />
      <FigmaComparePatterns />
    </main>
  );
}
