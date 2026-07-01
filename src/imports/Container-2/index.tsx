import svgPaths from "./svg-u985rqd0aj";

function Icon() {
  return (
    <div className="absolute left-[12px] size-[15px] top-[13.06px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p220e9c00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1de9fb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[41.111px] left-0 rounded-[4px] top-0 w-[1263.134px]" data-name="Text Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip pl-[36.556px] pr-[16.556px] py-[10.556px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by customer name or email address...</p>
      </div>
      <div aria-hidden className="absolute border-[#d1d5dc] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[41.111px] relative shrink-0 w-[1263.134px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <TextInput />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Account Status</p>
      </div>
    </div>
  );
}

function Dropdown() {
  return <div className="absolute bg-white border-[#d1d5dc] border-[0.556px] border-solid h-[41.111px] left-0 rounded-[4px] top-0 w-[182.326px]" data-name="Dropdown" />;
}

function Icon1() {
  return (
    <div className="absolute left-[159.33px] size-[12.995px] top-[14.06px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9948 12.9948">
        <g id="Icon">
          <path d={svgPaths.ped82800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0829" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[41.111px] relative shrink-0 w-[182.326px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Dropdown />
        <Icon1 />
      </div>
    </div>
  );
}

function SelectField() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-0 top-0" data-name="SelectField">
      <Label />
      <Container5 />
    </div>
  );
}

function Label1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Region</p>
      </div>
    </div>
  );
}

function Dropdown1() {
  return <div className="absolute bg-white border-[#d1d5dc] border-[0.556px] border-solid h-[41.111px] left-0 rounded-[4px] top-0 w-[160px]" data-name="Dropdown" />;
}

function Icon2() {
  return (
    <div className="absolute left-[137.01px] size-[12.995px] top-[14.06px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9948 12.9948">
        <g id="Icon">
          <path d={svgPaths.ped82800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0829" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[41.111px] relative shrink-0 w-[160px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Dropdown1 />
        <Icon2 />
      </div>
    </div>
  );
}

function SelectField1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[198.32px] top-0" data-name="SelectField">
      <Label1 />
      <Container6 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#314158] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[20px] py-[10px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Apply Filters</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative size-full">
        <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center underline whitespace-nowrap">Clear Filters</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-end left-[374.32px] top-[21.09px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[61.094px] relative shrink-0 w-[1263.134px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <SelectField />
        <SelectField1 />
        <Container7 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#d1d5dc] border-b-[0.556px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.556px] pt-[12px] px-[16px] relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute bg-[#f9fafb] border-[#e5e7eb] border-b-[0.556px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40.26px] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-0 tracking-[0.3px] uppercase w-[1326.571px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[16px] top-[12.55px]">Customer Name</p>
      <p className="absolute left-[159.38px] top-[12.55px]">Email Address</p>
      <p className="absolute left-[398.64px] top-[12.55px]">Phone Number</p>
      <p className="absolute left-[545.16px] top-[12.55px]">Library Size</p>
      <p className="absolute left-[660.6px] top-[12.55px]">Orders Placed</p>
      <p className="absolute left-[795.63px] top-[12.55px]">Total Spent</p>
      <p className="absolute left-[912.54px] top-[12.55px]">Account Status</p>
      <p className="absolute left-[1059.58px] top-[12.55px]">Last Active</p>
      <p className="absolute left-[1174.3px] top-[12.55px]">Actions</p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#45556c] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">RK</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Rajesh Kumar</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2024-03-12</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container11 />
        <Container12 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar />
      <Container10 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">45</p>
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">8</p>
      <Container14 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[57.257px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#016630] text-[12px] top-[4.33px] whitespace-nowrap">Active</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon3 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon4 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[40.26px] w-[1326.571px]" data-name="Table Row">
      <Container9 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">rajesh.kumar@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 98765 43210</p>
      <TableCell />
      <TableCell1 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹12,450</p>
      <Text />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-06-20</p>
      <Container15 />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-[#009689] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">PS</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Priya Sharma</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2025-01-05</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar1 />
      <Container17 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">23</p>
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">3</p>
      <Container21 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[57.257px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#016630] text-[12px] top-[4.33px] whitespace-nowrap">Active</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon5 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon6 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button4 />
      <Button5 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[162.78px] w-[1326.571px]" data-name="Table Row">
      <Container16 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">priya.sharma@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 87654 32109</p>
      <TableCell2 />
      <TableCell3 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹4,280</p>
      <Text1 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-06-18</p>
      <Container22 />
    </div>
  );
}

function Avatar2() {
  return (
    <div className="bg-[#7f22fe] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">AP</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Amit Patel</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2023-11-20</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar2 />
      <Container24 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">67</p>
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">12</p>
      <Container28 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[57.257px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#016630] text-[12px] top-[4.33px] whitespace-nowrap">Active</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon7 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon8 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button6 />
      <Button7 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[285.3px] w-[1326.571px]" data-name="Table Row">
      <Container23 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">amit.patel@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 76543 21098</p>
      <TableCell4 />
      <TableCell5 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹18,900</p>
      <Text2 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-06-21</p>
      <Container29 />
    </div>
  );
}

function Avatar3() {
  return (
    <div className="bg-[#ec003f] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">SR</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Sneha Reddy</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2024-07-30</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar3 />
      <Container31 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">31</p>
      <Container34 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">5</p>
      <Container35 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[57.257px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#016630] text-[12px] top-[4.33px] whitespace-nowrap">Active</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon9 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon10 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button8 />
      <Button9 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[407.81px] w-[1326.571px]" data-name="Table Row">
      <Container30 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">sneha.reddy@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 65432 10987</p>
      <TableCell6 />
      <TableCell7 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹7,600</p>
      <Text3 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-06-15</p>
      <Container36 />
    </div>
  );
}

function Avatar4() {
  return (
    <div className="bg-[#e17100] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">LI</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Lakshmi Iyer</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2025-03-14</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container39 />
        <Container40 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar4 />
      <Container38 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">14</p>
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">2</p>
      <Container42 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#f3f4f6] border-[#d1d5dc] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[66.137px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#4a5565] text-[12px] top-[4.33px] whitespace-nowrap">Inactive</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon11 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon12 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button10 />
      <Button11 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[530.33px] w-[1326.571px]" data-name="Table Row">
      <Container37 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">lakshmi.iyer@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 54321 09876</p>
      <TableCell8 />
      <TableCell9 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹1,890</p>
      <Text4 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-04-02</p>
      <Container43 />
    </div>
  );
}

function Avatar5() {
  return (
    <div className="bg-[#007595] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">VR</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Venkat Rao</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2023-08-05</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar5 />
      <Container45 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">52</p>
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">9</p>
      <Container49 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[57.257px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#016630] text-[12px] top-[4.33px] whitespace-nowrap">Active</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon13 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon14 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button12 />
      <Button13 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[652.85px] w-[1326.571px]" data-name="Table Row">
      <Container44 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">venkat.rao@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 43210 98765</p>
      <TableCell10 />
      <TableCell11 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹14,200</p>
      <Text5 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-06-19</p>
      <Container50 />
    </div>
  );
}

function Avatar6() {
  return (
    <div className="bg-[#007a55] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">MK</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Meena Krishnan</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2025-05-20</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar6 />
      <Container52 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[122.517px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">8</p>
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[122.517px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">1</p>
      <Container56 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#fef2f2] border-[#ffc9c9] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[86.094px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#c10007] text-[12px] top-[4.33px] whitespace-nowrap">Suspended</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon15 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon16 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button14 />
      <Button15 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.556px] border-solid h-[122.517px] left-0 top-[775.36px] w-[1326.571px]" data-name="Table Row">
      <Container51 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">meena.krishnan@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 32109 87654</p>
      <TableCell12 />
      <TableCell13 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹850</p>
      <Text6 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-02-10</p>
      <Container57 />
    </div>
  );
}

function Avatar7() {
  return (
    <div className="bg-[#4f39f6] relative rounded-[18641400px] shrink-0 size-[35.998px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">AM</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.25px] not-italic relative shrink-0 text-[#101828] text-[14px] w-[64px]">Arjun Mehta</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[64px]">Joined 2024-01-18</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-[63.385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container60 />
        <Container61 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[16px] top-[16.28px]" data-name="Container">
      <Avatar7 />
      <Container59 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[83.446px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">books</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[122.24px] left-[529.16px] top-0 w-[115.443px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">39</p>
      <Container62 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[15.99px] left-[16px] top-[63.26px] w-[103.038px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-[0.56px] whitespace-nowrap">orders</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[122.24px] left-[644.6px] top-0 w-[135.035px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[43.93px] whitespace-nowrap">7</p>
      <Container63 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.556px] border-solid h-[21.094px] left-[912.54px] rounded-[18641400px] top-[52.33px] w-[57.257px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[10px] not-italic text-[#016630] text-[12px] top-[4.33px] whitespace-nowrap">Active</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_380)" id="Icon">
          <path d={svgPaths.pc532580} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p12cdfa80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_380">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#cad5e2] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon17 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#45556c] text-[12px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_79_376)" id="Icon">
          <path d={svgPaths.p6157300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
          <path d={svgPaths.p3d9cd900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999708" />
        </g>
        <defs>
          <clipPath id="clip0_79_376">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10.556px] py-[6.556px] relative size-full">
        <Icon18 />
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[1174.3px] top-[46.71px]" data-name="Container">
      <Button16 />
      <Button17 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute h-[122.24px] left-0 top-[897.88px] w-[1326.571px]" data-name="Table Row">
      <Container58 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[159.38px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">arjun.mehta@example.com</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[398.64px] not-italic text-[#4a5565] text-[14px] top-[50.66px] whitespace-nowrap">+91 21098 76543</p>
      <TableCell14 />
      <TableCell15 />
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[795.63px] not-italic text-[#101828] text-[14px] top-[50.71px] whitespace-nowrap">₹9,340</p>
      <Text7 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-[1059.58px] not-italic text-[#6a7282] text-[14px] top-[50.66px] whitespace-nowrap">2026-06-22</p>
      <Container64 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[1020.122px] relative shrink-0 w-[1326.571px]" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TableRow />
        <TableRow1 />
        <TableRow2 />
        <TableRow3 />
        <TableRow4 />
        <TableRow5 />
        <TableRow6 />
        <TableRow7 />
        <TableRow8 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[1020.122px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Table />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140.582px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#6a7282] text-[0px] top-[0.67px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Showing `}</span>
          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1e2939] text-[14px]">8</span>
          <span className="leading-[20px] text-[14px]">{` of `}</span>
          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1e2939] text-[14px]">8</span>
          <span className="leading-[20px] text-[14px]">{` users`}</span>
        </p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[#314158] relative rounded-[4px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-center whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-center whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[21.814px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[3.99px] not-italic text-[#99a1af] text-[16px] top-[-0.78px] whitespace-nowrap">...</p>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-center whitespace-nowrap">8</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button18 />
        <Button19 />
        <Button20 />
        <Text9 />
        <Button21 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t-[0.556px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[12px] pt-[12.556px] px-[16px] relative size-full">
          <Text8 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white relative rounded-[10px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.556px] relative rounded-[inherit] size-full">
        <Container1 />
        <ContainerMargin />
        <Container8 />
        <Container65 />
      </div>
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}