import React, { useEffect, useState } from "react";
import { Model } from "@/utils/supabaseTypes";
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
function LandingPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedDataset, setSelectedDataset] = useState<string | undefined>();
  const [selectedTest, setSelectedTest] = useState<string | undefined>();
  const [models, setModels] = useState<Model[]>([]);
  useEffect(() => {
    async function getModels() {
      const { data, error } = await supabase.from("models").select("*");
      if (error) {
        alert(error.message);
        return;
      }
      data.map((row) => {
        id: row.id;
        name: row.string;
        createdBy: row.creator_id;
        endpoint: row.endpoint;
        apiKey: row.api_key;
        createdAt: row.created_at;
      });
      setModels(data);
      setLoading(false);
    }
    async function getDatasets() {}
    async function getTests() {}
    getModels();
  }, []);
  return (
    <div className="px-5">
      {!loading && (
        <>
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
                    {models.map((model) => (
                      <SelectItem value={model.id.toString()}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Custom Models</SelectLabel>
                    {customModelList.map((customModel) => (
                      <SelectItem value={customModel.id.toString()}>
                        {customModel.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
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
        </>
      )}
      <Button>Submit</Button>
    </div>
  );
}

export default LandingPage;
