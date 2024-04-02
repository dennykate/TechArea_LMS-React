import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  ActionIcon,
  HoverCard,
  Avatar,
} from "@mantine/core";
import { IconThumbUp, IconMessageCircle } from "@tabler/icons-react";
import PostModal from "./PostModal";
import { useDisclosure } from "@mantine/hooks";

interface Reaction {
  id: string;
  emoji: string;
}

const reactions: Reaction[] = [
  { id: "like", emoji: "👍" },
  { id: "love", emoji: "❤️" },
  { id: "haha", emoji: "😂" },
  { id: "wow", emoji: "😮" },
  { id: "sad", emoji: "😢" },
  { id: "angry", emoji: "😠" },
];

interface ParentProps {
  parent: string;
}
const Post: React.FC<ParentProps> = ({ parent }) => {
  const [reaction, setReaction] = useState<Reaction | null>(null);

  const [opened, { open, close }] = useDisclosure();
  return (
    <div className="w-full flex justify-center items-center">
      <Card
        shadow={`${parent === "newfeed" ? "md" : ""}`}
        padding="lg"
        radius="md"
        withBorder={parent === "newfeed"}
      >
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={600}
            alt="Norway"
          />
        </Card.Section>

        <div className="flex gap-5 items-center ">
          <Avatar
            radius={"100%"}
            size={"lg"}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
          <div>
            <Group style={{ justifyContent: "space-between" }} mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink">On Sale</Badge>
            </Group>

            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>
          </div>
        </div>

        <div className="flex w-full justify-around gap-1 mt-5">
          <HoverCard shadow="md" openDelay={50}>
            <HoverCard.Target>
              <Button
                fullWidth
                variant="outline"
                leftIcon={
                  reaction ? (
                    <span>{reaction.emoji}</span>
                  ) : (
                    <IconThumbUp size={16} />
                  )
                }
              >
                {reaction
                  ? reaction.id.charAt(0).toUpperCase() + reaction.id.slice(1)
                  : "Like"}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <div className="flex justify-center gap-2">
                {reactions.map((r) => (
                  <ActionIcon
                    key={r.id}
                    size="lg"
                    onClick={() => setReaction(r)}
                  >
                    <span>{r.emoji}</span>
                  </ActionIcon>
                ))}
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
          {parent === "newfeed" && (
            <Button
              fullWidth
              variant="outline"
              leftIcon={<IconMessageCircle size={16} />}
              onClick={open}
            >
              Comment
            </Button>
          )}
        </div>
      </Card>

      {/* modal for comment  */}
      <PostModal opened={opened} close={close} />
    </div>
  );
};

export default Post;
