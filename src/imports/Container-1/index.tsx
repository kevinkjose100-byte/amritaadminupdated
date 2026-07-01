import svgPaths from "./svg-vwii37h0ta";

function Icon() {
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

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 32, 69, 0.12) 0%, rgba(0, 32, 69, 0.04) 100%)" }} data-name="Container">
      <Icon />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Active Subscribers</p>
      </div>
    </div>
  );
}

function Icon1() {
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

function Frame1() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon1 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1b5e20] text-[12px] whitespace-nowrap">+12.5%</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame1 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">2,847</p>
        <Container4 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-center left-0 p-[20px] rounded-[12px] top-0 w-[269px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Icon2() {
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

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(46, 125, 50, 0.12) 0%, rgba(46, 125, 50, 0.04) 100%)" }} data-name="Container">
      <Icon2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame2 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Revenue (This Month)</p>
      </div>
    </div>
  );
}

function Icon3() {
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

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon3 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1b5e20] text-[12px] whitespace-nowrap">+8.2%</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame3 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph1 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">₹4,28,450</p>
        <Container8 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-start justify-center left-[281px] p-[28px] rounded-[12px] top-0 w-[271px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function Icon4() {
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

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(46, 125, 50, 0.12) 0%, rgba(46, 125, 50, 0.04) 100%)" }} data-name="Container">
      <Icon4 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame4 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Revenue (This Month)</p>
      </div>
    </div>
  );
}

function Icon5() {
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

function Frame5() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon5 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1b5e20] text-[12px] whitespace-nowrap">+8.2%</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame5 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph2 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">₹4,28,450</p>
        <Container12 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-start justify-center left-[281px] p-[28px] rounded-[12px] top-0 w-[271px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function Icon6() {
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

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-[12px] shrink-0 size-[38px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 32, 69, 0.12) 0%, rgba(0, 32, 69, 0.04) 100%)" }} data-name="Container">
      <Icon6 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[38px] relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Frame6 />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-w-px not-italic relative text-[#43474e] text-[12px] tracking-[0.6px] uppercase">Pending Orders</p>
      </div>
    </div>
  );
}

function Icon7() {
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

function Frame7() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon7 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#ba1a1a] text-[12px] whitespace-nowrap">-5.3%</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Frame7 />
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#43474e] text-[11px] whitespace-nowrap">vs last month</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Paragraph3 />
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[36px] not-italic relative shrink-0 text-[#191c1e] text-[30px] tracking-[-0.75px] whitespace-nowrap">127</p>
        <Container16 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex h-[183px] items-center left-[564px] p-[20px] rounded-[12px] top-0 w-[269px]" data-name="Container">
      <Container14 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Container5 />
      <Container9 />
      <Container13 />
    </div>
  );
}