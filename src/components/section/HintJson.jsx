import React from "react"
import { Info } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function JsonExampleDrawer({
    title,
    description,
    jsonExample,
}) {
    const { t } = useTranslation()

    return (
        <Drawer className="bg-[#021526]">
            <DrawerTrigger asChild>
                <Button type="button">
                    <Info size={16} />
                    <span className="text-white">
                        {t("jsonExample.button")}
                    </span>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="bg-[#021526] border-[#021526]">
                <div className="mx-auto w-full max-w-2xl bg-[#021526]">
                    <DrawerHeader>
                        <DrawerTitle className="flex items-center gap-2 text-white">
                            {title || t("jsonExample.title")}
                            <Badge variant="outline" className="text-white">
                                JSON
                            </Badge>
                        </DrawerTitle>

                        <DrawerDescription className="text-gray-300">
                            {description || t("jsonExample.description")}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4">
                        <ScrollArea className="h-[300px] w-full rounded-md border p-3 bg-black text-green-400 text-sm">
                            <pre>
                                {JSON.stringify(jsonExample, null, 2)}
                            </pre>
                        </ScrollArea>
                    </div>

                    <div className="p-4">
                        <div className="flex flex-row gap-3 items-center text-gray-300">
                            <Info size={16} />
                            <p>
                                {t("jsonExample.moreInfo")}{" "}
                                <a
                                    href="https://dev.id/certification/machine-learning"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    https://dev.id/certification/machine-learning
                                </a>
                            </p>
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="bg-[#021526]/10 text-white hover:bg-[#021526]/30 hover:text-white"
                            >
                                {t("jsonExample.close")}
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
