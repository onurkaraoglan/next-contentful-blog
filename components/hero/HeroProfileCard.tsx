"use client";

import { CardBody, CardContainer, CardItem } from "@onur/components/ui/3d-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@onur/components/ui/card";
import Link from "next/link";
import { Button } from "@onur/components/ui/button";
import { AnimatedTooltip } from "@onur/components/ui/animated-tooltip";
import { BackgroundGradient } from "@onur/components/ui/background-gradient";
import { heroData } from "@onur/data/static/hero";

export function HeroProfileCard() {
  return (
    <div className="z-10 hidden grow basis-1 justify-center lg:flex">
      <BackgroundGradient containerClassName="w-fit">
        <CardContainer containerClassName="py-0">
          <CardBody className="group/card flex flex-col rounded-[22px] bg-card p-6 shadow-[-5px_-3px_#ffffff17_inset] transition-all duration-300 hover:shadow-[-2px_-2px_#ffffff17_inset]">
            <CardItem
              translateZ="100"
              className="flex w-full gap-5 rounded-xl transition-all group-hover/card:shadow-lg"
            >
              <Card className="w-full shadow-[-2px_-1px_#ffffff16_inset] backdrop-blur-lg transition-all group-hover/card:shadow-[-1px_-1px_#ffffff16_inset] group-hover/card:drop-shadow-[5px_10px_10px_#17343e1c]">
                <CardHeader className="flex-row items-center gap-10 border-b border-secondary p-4">
                  <AnimatedTooltip
                    items={[
                      {
                        id: 1,
                        name: heroData.profileCard.tooltip.title,
                        designation: heroData.profileCard.tooltip.subTitle,
                        image: heroData.profileCard.tooltip.imagePath,
                      },
                    ]}
                  />
                  <div className="flex flex-col">
                    <CardTitle>{heroData.profileCard.title}</CardTitle>
                    <CardDescription>
                      {heroData.profileCard.subTitle}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p>{heroData.profileCard.body}</p>
                </CardContent>
              </Card>
            </CardItem>
            <CardItem
              translateZ="150"
              className="mt-auto flex w-full gap-5 rounded-xl"
            >
              <div className="flex w-full gap-5">
                {heroData.profileCard.socialUrls.map((social, i) => (
                  <Link
                    key={i}
                    className="group inline-block"
                    target="_blank"
                    href={social.url}
                  >
                    <Button className="shadow-[-2px_-2px_#00000069_inset] transition-all group-hover/card:shadow-[-1px_-1px_#00000069_inset]">
                      {social.icon}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </BackgroundGradient>
    </div>
  );
}

