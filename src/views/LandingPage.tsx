import React, { useEffect, useState } from "react";
import { LandingPageProps, Model } from "@/utils/supabaseTypes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "@heroicons/react/20/solid";

const modelList = [
  { name: "gpt", id: 694201 },
  { name: "claude", id: 12342 },
  { name: "gemini", id: 67893 },
];
const customModelList = [
  { name: "gpt-ft", id: 69420 },
  { name: "claude-fish", id: 12345 },
  { name: "gemin-eye", id: 67890 },
];
const datasets = [
  { name: "arc", id: 69420 },
  { name: "ceval", id: 12345 },
  { name: "hellaswag", id: 67890 },
];
const customDatasets = [{ name: "myCustomSet", id: 12341 }];
const tests = [
  { name: "kieval", id: 12343 },
  { name: "tsguessing", id: 25363 },
];
function LandingPage(props: LandingPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedDataset, setSelectedDataset] = useState<string | undefined>();
  const [selectedTest, setSelectedTest] = useState<string | undefined>();
  const [models, setModels] = useState<Model[]>([]);
  const [customModelEndpoint, setCustomModelEndpoint] = useState<string>("");
  const [customModelName, setCustomModelName] = useState<string>("");
  useEffect(() => {
    async function getModels() {
      const { data, error } = await supabase.from("models").select("*");
      if (error) {
        alert(error.message);
        return;
      }

      setModels(data);
      setLoading(false);
    }
    // TODO: Implement these
    // async function getDatasets() {}
    // async function getTests() {}
    getModels();
  }, []);
  async function addModel() {
    if (
      !customModelName ||
      !customModelEndpoint ||
      customModelName.trim() === "" ||
      customModelEndpoint.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error }: { data: Model[] | null; error: any } = await supabase
      .from("models")
      .upsert([
        {
          name: customModelName,
          endpoint: customModelEndpoint,
          creator_id: props.session!.user.id,
          version: "1.0.0",
          api_key: "123456",
        },
      ])
      .select();
    if (error) {
      alert(error.message);
      return;
    }

    console.log("success", data);
    setModels([...models, data![0]]);
  }

  async function deleteModel(id: string) {
    const { error } = await supabase.from("models").delete().match({ id: id });
    if (error) {
      alert(error.message);
      return;
    }
    setModels(models.filter((model) => model.id !== id));
  }
  return (
    <div className="px-5">
      {!loading && (
        <>
          <h1 className="font-bold text-xl pt-10">Display Model Results</h1>
          <div className="flex space-x-1 py-5">
            <div>
              <Select
                value={selectedModel}
                onValueChange={(value) => setSelectedModel(value)}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Default Models</SelectLabel>
                    {models
                      .filter((model) => {
                        return !model.custom_model;
                      })
                      .map((model) => (
                        <SelectItem value={model.id.toString()}>
                          {model.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                  {models.filter((model) => {
                    return model.custom_model;
                  }).length > 0 && (
                    <SelectGroup>
                      <SelectLabel>Custom Models</SelectLabel>
                      {models
                        .filter((model) => {
                          return model.custom_model;
                        })
                        .map((customModel) => (
                          <SelectItem value={customModel.id.toString()}>
                            {customModel.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={selectedDataset}
                onValueChange={(value) => setSelectedDataset(value)}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Dataset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Default Datasets</SelectLabel>
                    {datasets.map((set) => (
                      <SelectItem value={set.id.toString()}>
                        {set.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Custom Datasets</SelectLabel>
                    {customDatasets.map((customSet) => (
                      <SelectItem value={customSet.id.toString()}>
                        {customSet.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={selectedTest}
                onValueChange={(value) => setSelectedTest(value)}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Test" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>tests</SelectLabel>
                    {tests.map((test) => (
                      <SelectItem value={test.id.toString()}>
                        {test.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>View Results</Button>

          <h1 className="font-bold text-xl pt-10">Upload Custom Model</h1>
          <div className="py-3 flex space-x-2">
            <div>
              <Label>Endpoint URL</Label>
              <Input
                placeholder="https://api.mycompany.com/v1/model"
                type="text"
                className=""
                onChange={(e) => setCustomModelEndpoint(e.target.value)}
              />
            </div>
            <div>
              <Label>Name</Label>
              <Input
                placeholder="GPT-7"
                type="text"
                className=""
                onChange={(e) => setCustomModelName(e.target.value)}
              />
            </div>
          </div>
        </>
      )}
      <Button onClick={() => addModel()}>Create</Button>

      {models.filter((model) => {
        return model.creator_id === props.session!.user.id;
      }).length > 0 && (
        <div className="pt-10">
          <h1 className="font-bold text-xl">My Models</h1>
          <ul>
            {models
              .filter((model) => model.creator_id === props.session!.user.id)
              .map((model) => (
                <div className="flex p-2 space-x-1 items-center">
                  <button
                    onClick={() => {
                      deleteModel(model.id);
                    }}
                  >
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer" />
                  </button>
                  <li>{model.name}</li>
                </div>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
