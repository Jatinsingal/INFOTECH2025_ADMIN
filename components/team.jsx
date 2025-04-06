import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Jatin Singal",
    role: "President",
    image: "/images/president.png",
    bio: "Creative and skilled leader with knowledge in every field. Founded the Infotech Club in January 2025.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 2,
    name: "Jatin",
    role: "Vice President",
    image: "/images/vice-president.png",
    bio: "Very focused and punctual for his work. Helps manage club activities and events.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 3,
    name: "Nitin",
    role: "Technical Head",
    image: "/images/technical-head.png",
    bio: "Has great knowledge of technical skills. Leads the technical aspects of all club events.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 4,
    name: "Kavya Chhabra",
    role: "Social Head",
    image: "/images/social-head.png",
    bio: "Makes the club popular through video shooting and creating designs for the club's events and promotions.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 5,
    name: "Disha Gaba",
    role: "Research & Development",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menber1-UwESbDAxVBj5rbe0hu1LgLVe7X5FzF.jpeg",
    bio: "Leads research initiatives and develops new ideas for club projects and events.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 6,
    name: "Anushka",
    role: "Logistics Coordinator",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member3-ApOEoo8d9YIgpTWMCpOLnn1AVovRtA.jpeg",
    bio: "Manages all logistics and coordination for club events and activities.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 7,
    name: "Pankaj",
    role: "Management Head",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member7-Bx1rR4St0PQZV12RiuxqPyVej0R3Y6.jpeg",
    bio: "Oversees the management of club operations and ensures smooth functioning of all activities.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 8,
    name: "Mayank Saini",
    role: "Discipline Head",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member5-rEjYHkyjyamtBbHsPyicq5nwRqQg8f.jpeg",
    bio: "Maintains discipline and order during club events and ensures adherence to club rules.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  {
    id: 9,
    name: "OM Prakash",
    role: "Marketing Head",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member4-LI4u8y5iovWdplJb08lr5siorXos7A.jpeg",
    bio: "Leads the marketing efforts for club events and initiatives to increase visibility and participation.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
  
  {
    id: 10,
    name: "Jahanvi",
    role: "Communication Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/member2-a5J0oIO5RrnC6xZRuwzyyrCUVAtUIG.jpeg",
    bio: "Manages all communication channels and ensures effective information dissemination.",
    department: "IT Department",
    social: {
      instagram: "https://www.instagram.com/info_tech_cgc",
    },
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated individuals who work tirelessly to make Infotech Club a success.
          </p>
          <div className="w-20 h-1 bg-purple-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none bg-gray-800"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-purple-400">{member.name}</CardTitle>
                <CardDescription className="text-gray-300 font-medium">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  <Instagram size={20} />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative w-full max-w-4xl mx-auto h-80 mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/infoech-family-DQSgtn75N0UcbFEF6u92Yf0wMQzaW6.png"
              alt="Infotech Club Family"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-200 mb-4">The Infotech Family</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our club is more than just a team - we're a family of passionate tech enthusiasts working together to create
            amazing experiences and foster innovation at CGC Landran.
          </p>
        </div>
      </div>
    </section>
  )
}

