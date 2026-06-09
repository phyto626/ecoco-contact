import type { CaseStudy, Lead, SiteContent } from "@/types";

export const TAIWAN_CITIES = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "嘉義市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "金門縣",
  "連江縣"
];

export const LEAD_STATUSES = ["新申請", "聯繫中", "場勘中", "已完成"] as const;

export const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "把 ECOCO 智慧回收機帶進你的場域",
  heroSubtitle:
    "讓社區、商場、校園與企業空間成為循環經濟據點，透過智慧回收與回饋機制提升參與率。",
  heroImageUrl:
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
  heroStatNumber: "98%",
  heroStatLabel: "合作場域滿意度",
  casesTitle: "讓循環回收成為場域日常",
  casesSubtitle: "從企業辦公、社區公共空間到商場零售，ECOCO 協助不同場域建立可追蹤的永續行動。",
  applyTitle: "申請設置 ECOCO 智慧回收機",
  applySubtitle: "完成表單後，我們會依照場域條件與需求，由專人安排後續聯繫與評估。",
  footerText: "2026 ECOCO 智慧回收機申請設置服務",
  formApplicantTypeOptions: "企業,社區大樓,學校,商場零售,政府機關,其他",
  formMachineTypeOptions: "寶特瓶回收機,多品項回收機,大型場域方案",
  formPlacementLocationOptions: "室內,半戶外,戶外,尚未確定",
  formPowerOutletOptions: "有,無,需協助確認",
  formAvailableTimeOptions: "平日上午,平日下午,平日晚上,假日"
};

export const DEFAULT_CASES: CaseStudy[] = [
  {
    id: "case-retail",
    title: "商場回收熱點",
    description: "在零售動線導入回收回饋，提升來客互動並累積 ESG 數據。",
    category: "商場零售",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    sortOrder: 1,
    badgeTone: "primary",
    metricValue: "+15%",
    metricLabel: "Foot traffic increase",
    metricIcon: "trending_up",
    testimonial: "The machine has become a local landmark, bringing families and eco-conscious shoppers back daily."
  },
  {
    id: "case-office",
    title: "企業永續據點",
    description: "將員工日常回收轉化為可追蹤的永續行動與內部參與。",
    category: "企業辦公",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    sortOrder: 2,
    badgeTone: "secondary",
    metricValue: "4 tons",
    metricLabel: "Annual plastic recovery",
    metricIcon: "eco",
    testimonial: "Employees love the reward system. It turned ESG reporting from numbers into visible action."
  },
  {
    id: "case-community",
    title: "社區循環中心",
    description: "結合里民活動與回收機設置，打造高頻且便利的回收網絡。",
    category: "社區公共",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    sortOrder: 3,
    badgeTone: "primary",
    metricValue: "50k+",
    metricLabel: "Active users",
    metricIcon: "groups",
    testimonial: "The community is more engaged in sustainability because recycling is now easy to access."
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "L-001",
    timestamp: "2026-05-25T09:20:00.000Z",
    applicantType: "企業",
    contactName: "林小姐",
    phone: "0912-345-678",
    email: "lin@example.com",
    venueName: "南港辦公園區",
    city: "台北市",
    address: "南港區經貿二路 1 號",
    machineType: "智慧回收機",
    placementLocation: "室內大廳",
    hasPowerOutlet: "有",
    additionalNotes: "希望六月完成評估。",
    availableTime: ["平日上午"],
    status: "場勘中"
  },
  {
    id: "L-002",
    timestamp: "2026-05-26T13:10:00.000Z",
    applicantType: "社區",
    contactName: "王主任",
    phone: "0988-111-222",
    email: "wang@example.com",
    venueName: "青埔社區中心",
    city: "桃園市",
    address: "中壢區青峰路 88 號",
    machineType: "寶特瓶回收機",
    placementLocation: "半戶外騎樓",
    hasPowerOutlet: "需協助確認",
    additionalNotes: "住戶約 600 戶。",
    availableTime: ["平日下午", "假日"],
    status: "聯繫中"
  },
  {
    id: "L-003",
    timestamp: "2026-05-27T02:30:00.000Z",
    applicantType: "學校",
    contactName: "陳組長",
    phone: "0977-222-333",
    email: "chen@example.com",
    venueName: "海線高中",
    city: "台中市",
    address: "清水區學園路 12 號",
    machineType: "多品項回收機",
    placementLocation: "室內公共區",
    hasPowerOutlet: "有",
    additionalNotes: "想配合環境教育課程。",
    availableTime: ["平日上午"],
    status: "新申請"
  }
];
