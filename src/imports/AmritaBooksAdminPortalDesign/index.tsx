import svgPaths from "./svg-umb301zv7";
import imgImageAmritaBooks from "./23291b125d8ea18f9885f7db08f6cecb17fdbd20.png";
import { imgVector } from "./svg-99ua7";

function ImageAmritaBooks() {
  return (
    <div className="h-[44px] relative shrink-0 w-[152.539px]" data-name="Image (Amrita Books)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageAmritaBooks} />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18.695px] relative shrink-0 w-[96.711px]" data-name="Paragraph">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18.7px] left-0 not-italic text-[#64748b] text-[11px] top-[0.5px] tracking-[1.1px] uppercase whitespace-nowrap">Admin Portal</p>
    </div>
  );
}

function ParagraphMargin() {
  return (
    <div className="relative shrink-0" data-name="Paragraph (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[127.695px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e6e8ea] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[21px] pt-[32px] px-[24px] relative size-full">
        <ImageAmritaBooks />
        <ParagraphMargin />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[82.813px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-1px] whitespace-nowrap">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#002045] relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon />
          <Layout1 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 5.83333V17.5" id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25713000} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[58.664px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Catalog</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon1 />
          <Layout2 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p20f4ecf0} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2eca8c80} id="Vector_3" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.25 3.55833L13.75 7.85" id="Vector_4" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.828px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Orders</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon2 />
          <Layout3 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cfd5a00} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[65.852px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Tracking</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon3 />
          <Layout4 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pae3c380} id="Vector_4" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[44.266px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Users</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon4 />
          <Layout5 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24448b00} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 17.5H15.8333" id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[104.438px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Subscriptions</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon5 />
          <Layout6 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_1488)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pe074f00} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66667 10H18.3333" id="Vector_3" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_22_1488">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Layout7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[112.891px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Pricing Models</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon6 />
          <Layout7 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p28fb6c00} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21d3d9c0} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 10H11.6667" id="Vector_3" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[71.586px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Inventory</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon7 />
          <Layout8 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[59.945px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Finance</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon8 />
          <Layout9 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p33ed6f00} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 15H7.5" id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2f5b2980} id="Vector_3" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p76e7200} id="Vector_4" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pce04cf0} id="Vector_5" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Layout10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[101.188px]" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Consignment</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Icon9 />
          <Layout10 />
        </div>
      </div>
    </div>
  );
}

function LinkMargin8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <Link9 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="flex-[641.305_0_0] min-h-px relative w-full" data-name="Navigation">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
          <Link />
          <LinkMargin />
          <LinkMargin1 />
          <LinkMargin2 />
          <LinkMargin3 />
          <LinkMargin4 />
          <LinkMargin5 />
          <LinkMargin6 />
          <LinkMargin7 />
          <LinkMargin8 />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-full relative shrink-0 w-[256px]" data-name="Sidebar">
      <div aria-hidden className="absolute border-[#e6e8ea] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-px relative size-full">
        <Container />
        <Navigation />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[17px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #43474E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #43474E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[50px] left-0 rounded-[8px] top-0 w-[648.375px]" data-name="Text Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip pl-[45px] pr-[17px] py-[13px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(25,28,30,0.5)] w-full">Search catalog, orders, users...</p>
      </div>
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[648.375_0_0] h-[50px] max-w-[672px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon10 />
        <TextInput />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #191C1E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return <div className="absolute bg-[#002045] left-[24px] rounded-[9999px] shadow-[0px_0px_0px_0px_white] size-[8px] top-[8px]" data-name="Text" />;
}

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center p-[10px] relative size-full">
        <Icon11 />
        <Text />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#002045] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">A</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[48.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#191c1e] text-[16px] top-[-1px] whitespace-nowrap">Admin</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container5 />
        <Text1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <Button />
        <Container4 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[80px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden className="absolute border-[#e6e8ea] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px px-[32px] relative size-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5px] items-start not-italic relative size-full whitespace-nowrap">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#191c1e] text-[28px] tracking-[-0.75px]">Dashboard</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#43474e] text-[14px]">{`Welcome back, here's your overview`}</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p161d4800} id="Vector_2" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p13e20900} id="Vector_4" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 32, 69, 0.12) 0%, rgba(0, 32, 69, 0.04) 100%)" }} data-name="Container">
      <Icon12 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame1 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Active Subscribers</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon13 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1b5e20] text-[12px] whitespace-nowrap">+12.5%</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame2 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph1 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">2,847</p>
        <Container11 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-center left-0 p-[20px] rounded-[12px] top-0 w-[269px]" data-name="Container">
      <Container9 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 2V22" id="Vector" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2ba0dca0} id="Vector_2" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(46, 125, 50, 0.12) 0%, rgba(46, 125, 50, 0.04) 100%)" }} data-name="Container">
      <Icon14 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame3 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Revenue (This Month)</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon15 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1b5e20] text-[12px] whitespace-nowrap">+8.2%</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame4 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph2 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">₹4,28,450</p>
        <Container15 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-start justify-center left-[281px] p-[28px] rounded-[12px] top-0 w-[271px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 2V22" id="Vector" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2ba0dca0} id="Vector_2" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(46, 125, 50, 0.12) 0%, rgba(46, 125, 50, 0.04) 100%)" }} data-name="Container">
      <Icon16 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame5 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Revenue (This Month)</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #1B5E20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon17 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1b5e20] text-[12px] whitespace-nowrap">+8.2%</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame6 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph3 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">₹4,28,450</p>
        <Container19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-start justify-center left-[281px] p-[28px] rounded-[12px] top-0 w-[271px]" data-name="Container">
      <Container17 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3bfee9c0} id="Vector" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M12 22V12" id="Vector_2" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M3.29 7L12 12L20.71 7" id="Vector_3" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M7.5 4.27L16.5 9.42" id="Vector_4" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 32, 69, 0.12) 0%, rgba(0, 32, 69, 0.04) 100%)" }} data-name="Container">
      <Icon18 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[38px] relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container22 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame7 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Pending Orders</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1caa1e00} id="Vector" stroke="var(--stroke-0, #BA1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p8fd7300} id="Vector_2" stroke="var(--stroke-0, #BA1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon19 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#ba1a1a] text-[12px] whitespace-nowrap">-5.3%</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame8 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph4 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">127</p>
        <Container23 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-center left-[564px] p-[20px] rounded-[12px] top-0 w-[269px]" data-name="Container">
      <Container21 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[183px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container12 />
      <Container16 />
      <Container20 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[1.92%_1.44%_13.46%_18.73%]" data-name="Group">
      <div className="absolute inset-[86.54%_1.44%_13.46%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[65.38%_1.44%_34.62%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[44.23%_1.44%_55.77%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[23.08%_1.44%_76.92%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[1.92%_1.44%_98.08%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[1.92%_1.44%_13.46%_18.73%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[91.35%_78.24%_2.88%_15.71%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_78.24%_2.88%_15.71%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Oct</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[91.35%_61.99%_2.88%_31.38%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_61.99%_2.88%_31.38%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Nov</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[91.35%_46.02%_2.88%_47.35%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_46.02%_2.88%_47.35%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Dec</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[91.35%_30.35%_2.88%_63.6%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_30.35%_2.88%_63.6%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Jan</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[91.35%_14.38%_2.88%_79.57%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_14.38%_2.88%_79.57%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Feb</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[91.35%_0.01%_2.88%_93.65%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_0.01%_2.88%_93.65%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Mar</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[91.35%_0.01%_2.88%_15.71%]" data-name="Group">
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[91.35%_0.01%_2.88%_15.71%]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[83.56%_85.88%_10.67%_8.07%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[83.56%_85.88%_10.67%_8.07%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">₹0k</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[62.41%_85.88%_31.82%_4.32%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[62.41%_85.88%_31.82%_4.32%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">₹150k</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[41.25%_85.88%_52.98%_3.75%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[41.25%_85.88%_52.98%_3.75%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">₹300k</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[20.1%_85.88%_74.13%_3.75%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[20.1%_85.88%_74.13%_3.75%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">₹450k</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[0.48%_85.88%_93.75%_3.75%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.48%_85.88%_93.75%_3.75%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">₹600k</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[0.48%_85.88%_10.67%_3.75%]" data-name="Group">
      <Group12 />
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[0.48%_85.88%_10.67%_3.75%]" data-name="Group">
      <Group11 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[23.78%_1.44%_13.46%_18.73%]" data-name="Group">
      <div className="absolute inset-[23.78%_1.44%_13.46%_18.73%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-61.833px] mask-size-[277px_228px]" style={{ maskImage: `url("${imgVector}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 163.167">
          <path d={svgPaths.p101e7f00} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[23.78%_1.44%_59.29%_18.73%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-61.833px] mask-size-[277px_228px]" style={{ maskImage: `url("${imgVector}")` }} data-name="Vector">
        <div className="absolute inset-[-3.41%_-0.16%_-3.02%_-0.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 278.132 46.8275">
            <path d={svgPaths.pf7b66e0} id="Vector" stroke="var(--stroke-0, #002045)" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[23.78%_1.44%_13.46%_18.73%]" data-name="Group">
      <Group20 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_1.44%_12.31%_18.73%]" data-name="Clip path group">
      <Group19 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[0_1.44%_12.31%_18.73%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[22.24%_0.29%_57.76%_17.58%]" data-name="Group">
      <div className="absolute inset-[39.17%_80.12%_57.76%_17.58%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[28.87%_64.15%_68.05%_33.54%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[22.24%_48.18%_74.68%_49.51%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[26.9%_32.22%_70.03%_65.48%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[28.87%_16.25%_68.05%_81.44%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[24.58%_0.29%_72.35%_97.41%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} fill="var(--fill-0, #002045)" fillOpacity="0.1" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[0_0.29%_12.31%_17.58%]" data-name="Group">
      <Group18 />
      <Group21 />
    </div>
  );
}

function Surface() {
  return (
    <div className="h-[260px] relative shrink-0 w-full" data-name="Surface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group />
        <Group2 />
        <Group10 />
        <Group17 />
      </div>
    </div>
  );
}

function ParagraphMargin1() {
  return <div className="h-[4px] relative shrink-0 w-full" data-name="Paragraph (margin)" />;
}

function DefaultTooltipContent() {
  return (
    <div className="bg-[rgba(255,255,255,0.95)] opacity-0 relative rounded-[6px] shrink-0 w-full" data-name="DefaultTooltipContent2">
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[11px] relative size-full">
        <ParagraphMargin1 />
      </div>
    </div>
  );
}

function TooltipBoundingBox() {
  return (
    <div className="absolute left-[65px] opacity-0 top-[10px] w-[22px]" data-name="TooltipBoundingBox2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <DefaultTooltipContent />
      </div>
    </div>
  );
}

function AreaChart() {
  return (
    <div className="h-[260px] relative shrink-0 w-[347px]" data-name="AreaChart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Surface />
        <TooltipBoundingBox />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[284px] relative shrink-0 w-[346.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] relative size-full">
        <AreaChart />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[370px] items-start justify-between left-0 p-[21px] rounded-[12px] top-0 w-[410px]" data-name="Container">
      <div aria-hidden className="absolute border border-[rgba(230,232,234,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#191c1e] text-[18px] whitespace-nowrap">Revenue Trend</p>
      <Container26 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[1.92%_1.44%_13.46%_18.73%]" data-name="Group">
      <div className="absolute inset-[86.54%_1.44%_13.46%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[65.38%_1.44%_34.62%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[44.23%_1.44%_55.77%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[23.08%_1.44%_76.92%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[1.92%_1.44%_98.08%_18.73%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277 1">
            <path d="M0 0.5H277" id="Vector" opacity="0.3" stroke="var(--stroke-0, #E6E8EA)" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[1.92%_1.44%_13.46%_18.73%]" data-name="Group">
      <Group23 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[91.35%_71.96%_2.88%_20.83%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_71.96%_2.88%_20.83%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Mon</p>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[91.35%_61.14%_2.88%_32.81%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_61.14%_2.88%_32.81%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Tue</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[91.35%_49.01%_2.88%_43.5%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_49.01%_2.88%_43.5%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Wed</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[91.35%_38.18%_2.88%_55.48%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_38.18%_2.88%_55.48%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Thu</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[91.35%_27.79%_2.88%_67.89%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_27.79%_2.88%_67.89%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Fri</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[91.35%_15.81%_2.88%_78.72%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_15.81%_2.88%_78.72%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Sat</p>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[91.35%_3.97%_2.88%_89.69%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[91.35%_3.97%_2.88%_89.69%] leading-[normal] not-italic text-[#43474e] text-[12px] text-center whitespace-nowrap">Sun</p>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[91.35%_3.97%_2.88%_20.83%]" data-name="Group">
      <Group26 />
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
      <Group31 />
      <Group32 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[91.35%_3.97%_2.88%_20.83%]" data-name="Group">
      <Group25 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[83.56%_85.88%_10.67%_11.82%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[83.56%_85.88%_10.67%_11.82%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">0</p>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[62.41%_85.88%_31.82%_9.8%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[62.41%_85.88%_31.82%_9.8%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">20</p>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute contents inset-[41.25%_85.88%_52.98%_9.51%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[41.25%_85.88%_52.98%_9.51%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">40</p>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[20.1%_85.88%_74.13%_9.8%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[20.1%_85.88%_74.13%_9.8%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">60</p>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[0.48%_85.88%_93.75%_9.8%]" data-name="Group">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.48%_85.88%_93.75%_9.8%] leading-[normal] not-italic text-[#43474e] text-[12px] text-right whitespace-nowrap">80</p>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[0.48%_85.88%_10.67%_9.51%]" data-name="Group">
      <Group35 />
      <Group36 />
      <Group37 />
      <Group38 />
      <Group39 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[0.48%_85.88%_10.67%_9.51%]" data-name="Group">
      <Group34 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[38.94%_71.19%_13.46%_19.87%]" data-name="Group">
      <div className="absolute inset-[38.94%_71.19%_13.46%_19.87%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 123.75">
          <path d={svgPaths.pc38baf0} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[31.54%_59.79%_13.46%_31.28%]" data-name="Group">
      <div className="absolute inset-[31.54%_59.79%_13.46%_31.28%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 143">
          <path d={svgPaths.p220e4e00} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute contents inset-[46.35%_48.39%_13.46%_42.68%]" data-name="Group">
      <div className="absolute inset-[46.35%_48.39%_13.46%_42.68%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 104.5">
          <path d={svgPaths.p18a3e770} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents inset-[22.02%_36.98%_13.46%_54.08%]" data-name="Group">
      <div className="absolute inset-[22.02%_36.98%_13.46%_54.08%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 167.75">
          <path d={svgPaths.p1d9fa000} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute contents inset-[35.77%_25.58%_13.46%_65.49%]" data-name="Group">
      <div className="absolute inset-[35.77%_25.58%_13.46%_65.49%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 132">
          <path d={svgPaths.p607f480} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute contents inset-[49.52%_14.17%_13.46%_76.89%]" data-name="Group">
      <div className="absolute inset-[49.52%_14.17%_13.46%_76.89%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 96.25">
          <path d={svgPaths.pa0a4200} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents inset-[56.92%_2.77%_13.46%_88.3%]" data-name="Group">
      <div className="absolute inset-[56.92%_2.77%_13.46%_88.3%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 77">
          <path d={svgPaths.p3510b100} fill="var(--fill-0, #2E7D32)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[22.02%_2.77%_13.46%_19.87%]" data-name="Group">
      <Group43 />
      <Group44 />
      <Group45 />
      <Group46 />
      <Group47 />
      <Group48 />
      <Group49 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[22.02%_2.77%_13.46%_19.87%]" data-name="Group">
      <Group42 />
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[22.02%_2.77%_13.46%_19.87%]" data-name="Group">
      <Group41 />
    </div>
  );
}

function Surface1() {
  return (
    <div className="h-[260px] relative shrink-0 w-full" data-name="Surface">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group22 />
        <Group24 />
        <Group33 />
        <Group40 />
      </div>
    </div>
  );
}

function ParagraphMargin2() {
  return <div className="h-[4px] relative shrink-0 w-full" data-name="Paragraph (margin)" />;
}

function DefaultTooltipContent1() {
  return (
    <div className="bg-[rgba(255,255,255,0.95)] opacity-0 relative rounded-[6px] shrink-0 w-full" data-name="DefaultTooltipContent2">
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[11px] relative size-full">
        <ParagraphMargin2 />
      </div>
    </div>
  );
}

function TooltipBoundingBox1() {
  return (
    <div className="absolute left-[65px] opacity-0 top-[10px] w-[22px]" data-name="TooltipBoundingBox2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <DefaultTooltipContent1 />
      </div>
    </div>
  );
}

function BarChart() {
  return (
    <div className="h-[260px] relative shrink-0 w-[347px]" data-name="BarChart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Surface1 />
        <TooltipBoundingBox1 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[284px] relative shrink-0 w-[346.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] relative size-full">
        <BarChart />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col h-[370px] items-start justify-between left-[422px] p-[21px] rounded-[12px] top-0 w-[410px]" data-name="Container">
      <div aria-hidden className="absolute border border-[rgba(230,232,234,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#191c1e] text-[18px] whitespace-nowrap">Weekly Orders</p>
      <Container28 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[370px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container27 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p377dab00} id="Vector" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #002045)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(0,32,69,0.1)] relative rounded-[8px] shrink-0 size-[38px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container31 />
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#191c1e] text-[18px] whitespace-nowrap">System Alerts</p>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p377dab00} id="Vector" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(254,243,198,0.6)] content-stretch flex flex-col items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <Icon21 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <Container34 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#7b3306] text-[14px] whitespace-nowrap">Low Inventory</p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[27px] relative shrink-0 w-[523px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-[rgba(187,77,0,0.9)] whitespace-nowrap">Bhagavad Gita (Hindi) - Only 12 copies left</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[523.656_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[15px] py-[9px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#191c1e] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#002045] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[14px] py-[8px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Resolve</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-[142px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[4px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <ContainerMargin />
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(255,251,235,0.4)] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[rgba(254,243,198,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start p-[21px] relative size-full">
        <Container33 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_1483)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V10" id="Vector_2" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H10.0083" id="Vector_3" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_22_1483">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[rgba(255,226,226,0.6)] content-stretch flex flex-col items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <Icon22 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <Container39 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#82181a] text-[14px] whitespace-nowrap">Failed Delivery</p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[27px] relative shrink-0 w-[523px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-[rgba(193,0,7,0.9)] whitespace-nowrap">Order #AMR-2847 marked as RTS by India Post</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[523.656_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[15px] py-[9px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#191c1e] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#002045] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[14px] py-[8px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Resolve</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[38px] relative shrink-0 w-[142px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[4px] relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <ContainerMargin1 />
        <Container40 />
        <Container41 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[rgba(254,242,242,0.4)] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[rgba(255,226,226,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start p-[21px] relative size-full">
        <Container38 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p377dab00} id="Vector" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[rgba(254,243,198,0.6)] content-stretch flex flex-col items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Container">
      <Icon23 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <Container44 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#7b3306] text-[14px] whitespace-nowrap">Low Inventory</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[27px] relative shrink-0 w-[523px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[14px] text-[rgba(187,77,0,0.9)] whitespace-nowrap">Upanishads Collection (Tamil) - Only 8 copies left</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[523.656_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f7f9fb] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[15px] py-[9px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#191c1e] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#002045] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[14px] py-[8px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Resolve</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[38px] relative shrink-0 w-[142px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[4px] relative size-full">
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <ContainerMargin2 />
        <Container45 />
        <Container46 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[rgba(255,251,235,0.4)] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[rgba(254,243,198,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start p-[21px] relative size-full">
        <Container43 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7px] items-start relative size-full">
        <Container32 />
        <Container37 />
        <Container42 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border border-[#e6e8ea] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[15px] items-start p-[21px] relative size-full">
        <Container30 />
        <Frame9 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Container7 />
        <Container24 />
        <Container29 />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="relative shrink-0 w-full" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Container6 />
        <Frame />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[689_0_0] min-h-px relative w-full" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[20px] relative size-full">
        <Dashboard />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[873_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="bg-[#f7f9fb] h-[769px] relative shrink-0 w-full" data-name="Layout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Sidebar />
        <Container1 />
      </div>
    </div>
  );
}

export default function AmritaBooksAdminPortalDesign() {
  return (
    <div className="bg-[#f7f9fb] content-stretch flex flex-col items-start relative size-full" data-name="Amrita Books Admin Portal Design">
      <Layout />
    </div>
  );
}